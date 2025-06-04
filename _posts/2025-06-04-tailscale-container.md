---
layout:     post
title:      Tailscale Container
date:       2025-05-17 12:00:00
author:     Ožbolt Menegatti
summary:    Expose nodes inside Telnet to other containers on the system
categories: scripts
thumbnail:  /static/idea.png
tags:
 - scripts
 - docker
---

# Tailscale and container

There is [this](https://tailscale.com/kb/1282/docker) page on Tailscale website explaining how to use Tailscale within a Docker container. It shows you how to build the docker container, authenticate and serve any number of containers to your tailnet. But there was something I wanted this did not cover, how to do it in reverse: expose apps (served over TCP/UDP) from your tailnet to the host or to another container.

# Solution

There is my solution for this:

```
services:
  tailscale-container:
    image: tailscale/tailscale:latest
    hostname: tailscale-container
    environment:
      - TS_AUTHKEY=tskey-auth-xxxxxx
      - TS_STATE_DIR=/var/lib/tailscale
      - TS_SOCKS5_SERVER=:10055
    volumes:
      - tailscale-data:/var/lib/tailscale
    # optionally expose services to host or to anyone
    # ports:
    #   - 127.0.0.1:10022:10022/tcp
    #   - 10022:10022/tcp
    devices:
      - /dev/net/tun:/dev/net/tun
    cap_add:
      - net_admin
      - sys_module
    restart: unless-stopped
  ssh-to-node2:
    image: ghcr.io/gareins/socat5docker:main
    environment:
      - SOCAT_CMD=TCP-LISTEN:10022,fork SOCKS5:tailscale-container:100.0.0.2:22,socks5port=10055
    depends_on:
      - tailscale-container
    network_mode: service:tailscale-container
  snmp-to-node3
    image: ghcr.io/gareins/socat5docker:main
    environment:
      - SOCAT_CMD=UDP-LISTEN:10161,fork SOCKS5:tailscale-container:100.0.0.3:161,socks5port=10055
    depends_on:
      - tailscale-container
    network_mode: service:tailscale-container
volumes:
  tailscale-data:
    driver: local

```

Now just connect any container to the network of this stack. So for example lets say the name of this network is `tailscale-container_default`. Do this to compose file to connect:

```
...
    networks:
      - tailscale-container_default
...
networks:
  tailscale-container_default:
    external: true
```


```

Now you can ssh to the node2 using `ssh user@tailscale-container -p 10022`

# How does this work though

There are some details for this implementation:

* Tailscale container presents a [socks5](https://en.wikipedia.org/wiki/SOCKS#SOCKS5) proxy with which you can use to connect to any node on the tailscale network. In contrast to SOCKS4, version 5 allows us to connect to UDP ports and we take advantage of that on our snmp-to-node3 container.
* [Socat](https://man.archlinux.org/man/socat1.1.en) is a program that is described as a multiporpose relay and in the case of ssh-to-node2 listens on a TCP/10022 port and relays any traffic there to node2's TCP/22.
* Socat by default does not provide socks5 support, so this implementation uses [**runsisi's** fork](https://github.com/runsisi/socat), it builds it with the help of [**andrew-d's** static build scripts](https://github.com/gareins/static-binaries-socat) and then [I build a docker image](https://github.com/gareins/Socat5Docker) that accepts the `SOCAT_CMD` environmental variable.



