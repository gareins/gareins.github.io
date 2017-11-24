import unittest

otroci = {"Adam": ["Matjaž", "Cilka", "Daniel", "Erik"], "Aleksander": [], "Alenka": [], "Barbara": [], "Cilka": [],
          "Daniel": ["Elizabeta", "Hans"], "Erik": [], "Elizabeta": ["Ludvik", "Jurij", "Barbara", "Herman"],
          "Franc": [], "Herman": ["Margareta"], "Hans": [], "Jožef": ["Alenka", "Aleksander", "Petra"],
          "Jurij": ["Franc", "Jožef"], "Ludvik": [], "Margareta": [], "Matjaž": ["Viljem"], "Mihael": [], "Petra": [],
          "Tadeja": [], "Viljem": ["Tadeja"]}


# vasa koda....
def koliko_zensk(oseba):
    pass


# tetsi....
class Testi_Vaje_Rodbina(unittest.TestCase):
    def test_kolikokrat_ime(self):
        self.assertEqual(kolikokrat_ime("Adam", "A"), 3)
        self.assertEqual(kolikokrat_ime("Adam", "E"), 2)
        self.assertEqual(kolikokrat_ime("Adam", "B"), 1)
        self.assertEqual(kolikokrat_ime("Adam", "G"), 0)

    def test_kolikokrat_zensk(self):
        self.assertEqual(koliko_zensk("Jurij"), 2)
        self.assertEqual(koliko_zensk("Erik"), 0)
        self.assertEqual(koliko_zensk("Elizabeta"), 5)

    def test_vsa_rodbina(self):
        self.assertSetEqual(vsa_rodbina("Jurij"),
                            {"Jurij", "Franc", "Jožef", "Alenka", "Petra", "Aleksander"})
        self.assertSetEqual(vsa_rodbina("Alenka"),
                            {"Alenka"})

    def test_vse_potomstvo(self):
        self.assertSetEqual(vse_potomstvo("Jurij"),
                            {"Franc", "Jožef", "Alenka", "Petra", "Aleksander"})
        self.assertSetEqual(vse_potomstvo("Alenka"), set())

    def test_kako_dalec(self):
        self.assertEqual(kako_dalec("Elizabeta", "Petra"), 3)
        self.assertEqual(kako_dalec("Elizabeta", "Jurij"), 1)
        self.assertEqual(kako_dalec("Elizabeta", "Margareta"), 2)
        self.assertEqual(kako_dalec("Elizabeta", "Elizabeta"), 0)

    def test_pot_do(self):
        self.assertEqual(pot_do("Elizabeta", "Petra"), ["Elizabeta", "Jurij", "Jožef", "Petra"])
        self.assertEqual(pot_do("Elizabeta", "Jurij"), ["Elizabeta", "Jurij"])
        self.assertEqual(pot_do("Elizabeta", "Margareta"), ["Elizabeta", "Herman", "Margareta"])


class Testi_Vaje_Drugo(unittest.TestCase):
    def test_vsota2(self):
        self.assertEqual(vsota2([]), 0)
        self.assertEqual(vsota2([[[]]]), 0)
        self.assertEqual(vsota2([5, 4, 6]), 15)
        self.assertEqual(vsota2([5, [], [4, [6]]]), 15)
        self.assertEqual(vsota2([[5, 4], [], [[6]]]), 15)

    def test_convert(self):
        self.assertEqual(convert([]), ())
        self.assertEqual(convert([1]), (1, ()))
        self.assertEqual(convert([5, 4, 6, 7, 1]), (5, (4, (6, (7, (1, ()))))))
        self.assertEqual(convert([5, 4, 6, 7, 1, 0]), (5, (4, (6, (7, (1, (0, ())))))))

    def test_length(self):
        self.assertEqual(length(()), 0)
        self.assertEqual(length((1, ())), 1)
        self.assertEqual(length((5, (4, (6, (7, (1, ())))))), 5)
        self.assertEqual(length((5, (4, (6, (7, (1, (0, ()))))))), 6)

    def test_dup(self):
        self.assertEqual(dup((1, (2, ()))), (1, (1, (2, (2, ())))))
        self.assertEqual(dup((5, (4, (6, (7, (1, ())))))), (5, (5, (4, (4, (6, (6, (7, (7, (1, (1, ())))))))))))

    def test_reverse(self):
        self.assertEqual(reverse((5, (4, (6, (7, (1, ())))))), (1, (7, (6, (4, (5, ()))))))


if __name__ == "__main__":
    unittest.main()
