const MenuItems = [
    {
        title: 'Greek Salad',
        subTitle: '$22',
        getImgSrc: () => require("../images/greek-salad.jpg"),
        desc: 'A delicious blend of vegetables, feta, and herbs.',
        altDesc: 'Greek salad',
        type: 'salad',
        key: 1
    },
    {
        title: 'Bruchetta',
        subTitle: '$15',
        getImgSrc: () => require("../images/bruchetta.png"),
        desc: 'Light, cripsy bread topped with a flavorful blend of tomatoes and basil.',
        altDesc: 'Plate of bruchetta',
        type: 'appetizer',
        key: 2
    },
    {
        title: 'Fig and Goat Cheese',
        subTitle: '$12',
        getImgSrc: () => require("../images/fig-and-goat-cheese.png"),
        desc: 'Roasted fig topped with whipped goat cheese and a hint of honey.',
        altDesc: 'Plate of figs and goat cheese',
        type: 'appetizer',
        key: 3
    },
    {
        title: 'Veggie Bowl',
        subTitle: '$24',
        getImgSrc: () => require("../images/veggie-bowl.png"),
        desc: 'Various vegetables enriched with delicious herbs, feta, and hummus.',
        altDesc: 'Vegetable and couscous bowl',
        type: 'entree',
        key: 4
    },
    {
        title: 'Lamb Gyro',
        subTitle: '$28',
        getImgSrc: () => require("../images/lamb-gyro.png"),
        desc: 'A greek classic with shaved lamb, fresh onions and greens, and topped with whipped feta.',
        altDesc: 'Plate of bruchetta',
        type: 'entree',
        key: 5
    },
    {
        title: 'Lemon Cake',
        subTitle: '$12',
        getImgSrc: () => require("../images/lemon-dessert.jpg"),
        desc: 'An airy cake with a hint of zest.',
        altDesc: 'Plate of lemon cake',
        type: 'dessert',
        key: 6
    },
    {
        title: 'Baklva Ice Cream Sandwich',
        subTitle: '$16',
        getImgSrc: () => require("../images/baklava.jpg"),
        desc: 'Light and flakely philo dough fried with pistachios and honey. Stuffed with homemade vanilla ice cream.',
        altDesc: 'Plate of baklava',
        type: 'dessert',
        key: 7
    },
    {
        title: 'Greek Pasta Salad',
        subTitle: '$18',
        getImgSrc: () => require("../images/greek-pasta-salad.jpg"),
        desc: 'Fresh cucumbers, tomatoes, olives, and roasted red peppers mixed with feta cheese and penne pasta. Topped with a housemade balsamic dressing.',
        altDesc: 'Bowl of Greek pasta salad',
        type: 'salad',
        key: 8
    },
    {
        title: 'Baked Salmon',
        subTitle: '$25',
        getImgSrc: () => require("../images/salmon-chickpea-zucchini.jpeg"),
        desc: 'Fresh salmon filet marinaded in citrus-based sauce, and plated with roasted chickpeas and zucchini.',
        altDesc: 'Plate salmon and vegetables',
        type: 'entree',
        key: 9
    },
    {
        title: 'Moussaka',
        subTitle: '$28',
        getImgSrc: () => require("../images/moussaka.jpg"),
        desc: 'A classic Greek comfort food of steak filet pie with a rich, mashed potato topping.',
        altDesc: 'Plate steak and mashed potato moussaka',
        type: 'entree',
        key: 10
    },
    {
        title: 'Whole Roasted Fish',
        subTitle: '$29',
        getImgSrc: () => require("../images/roast-fish.jpg"),
        desc: 'Striped bass lightly roasted and served whole over a bed of couscous.',
        altDesc: 'Plate of two whole roasted fish',
        type: 'entree',
        key: 11
    },
    {
        title: 'Mediterranean Charcuterie Board',
        subTitle: '$21',
        getImgSrc: () => require("../images/charcuterie-board.jpg"),
        desc: 'A twist on the classic charcuterie board. Fresh, fried potato balls, pita, pitted olives, and hummus to share.',
        altDesc: 'Plate of various pitas, olives, and fried potato balls',
        type: 'appetizer',
        key: 12
    },
    {
        title: 'Chicken Kabobs',
        subTitle: '$22',
        getImgSrc: () => require("../images/chicken-kabobs.jpg"),
        desc: 'Light chicken breast skews marginated in lemon juice and served with fresh vegetables.',
        altDesc: 'Plate chicken kabobs with lemon and vegetables',
        type: 'entree',
        key: 13
    },
    {
        title: 'Pistachio Falafel',
        subTitle: '$16',
        getImgSrc: () => require("../images/pistachio-falafel.jpg"),
        desc: 'Mashed chickpeas and herbs lightly breaded in a pistachio crust and pan-fried.',
        altDesc: 'Plate of falafel balls',
        type: 'appetizer',
        key: 14
    },
    {
        title: 'Tomato Orzo',
        subTitle: '$18',
        getImgSrc: () => require("../images/tomato-orzo.jpeg"),
        desc: 'Orzo in a housemade, tomato, basil sauce. Topped with feta and served warm.',
        altDesc: 'Bowl of tomato orzo and feta',
        type: 'entree',
        key: 15
    },
    {
        title: 'Chickpea Salad',
        subTitle: '$13',
        getImgSrc: () => require("../images/chickpea-salad.jpg"),
        desc: 'Fresh blend of chickpeas, red onion, and herbs in a light vinegarette.',
        altDesc: 'Bowl of chickpeas',
        type: 'salad',
        key: 16
    },
    {
        title: 'Doukissa',
        subTitle: '$12',
        getImgSrc: () => require("../images/doukissa.jpg"),
        desc: 'A light, no-bake chocolate biscuit cake.',
        altDesc: 'Plate of chocolate cake',
        type: 'dessert',
        key: 17
    }
];

export default MenuItems;