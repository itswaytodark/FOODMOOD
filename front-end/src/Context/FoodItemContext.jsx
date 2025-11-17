import { createContext, useContext } from "react";

export const FoodItemContext = createContext([]); 

export const FoodItemProvider = ({ children }) => {
  const foodItems = [
    // --- MAIN COURSE (Indian) ---
    {
      id: "f1",
      name: "Paneer Butter Masala",
      price: 220,
      calories: 420,
      spice: "Medium",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ruchiskitchen.com%2Fwp-content%2Fuploads%2F2020%2F12%2FPaneer-butter-masala-recipe-3.jpg&f=1&nofb=1&ipt=b432ec65ed207155147f58ce3ed97b559a77fb374d07881ada61f3b43c78dcca",
      category: "Main Course",
    },
    {
      id: "f2",
      name: "Veg Biryani",
      price: 180,
      calories: 520,
      spice: "Low",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FDo7ZdUodDdw%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=7dcac91e00e72ae6775593e887f615bd38c467ebfed992730a08ac817332b7da",
      category: "Main Course",
    },
    {
      id: "f5",
      name: "Dal Makhani",
      price: 160,
      calories: 380,
      spice: "Mild",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frainbowplantlife.com%2Fwp-content%2Fuploads%2F2021%2F06%2Fdal-makhani-flatlay-closeup-with-spoon-819x1024.jpg&f=1&nofb=1&ipt=646d40fa3ad833a9ab3f1a07f00a7dbb3e32c7fbd6c824094f66d6ac59f1d8d1",
      category: "Main Course",
    },
    {
      id: "f6",
      name: "Chicken Tikka Masala",
      price: 280,
      calories: 550,
      spice: "Medium",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.licious.in%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2FChicken-Tikka-Masala-min.jpg&f=1&nofb=1&ipt=da15a889e5b3b6af0cbcc934fe2308895df2dc0c2d54f4963e3a4ae9f5e425cf",
      category: "Main Course",
    },

    // --- MAIN COURSE (Indo-Chinese/Global) ---
    {
      id: "f7",
      name: "Chilli Paneer (Dry)",
      price: 200,
      calories: 450,
      spice: "Hot",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frumkisgoldenspoon.com%2Fwp-content%2Fuploads%2F2021%2F04%2FChilli-paneer-dry.jpg&f=1&nofb=1&ipt=56906021bdb80a017c671362cc5d2b020ffc3376b9e4c94c4819b21ee5e48017",
      category: "Main Course",
    },
    {
      id: "f8",
      name: "Veg Hakka Noodles",
      price: 140,
      calories: 400,
      spice: "Low",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fwww.carveyourcraving.com%2Fwp-content%2Fuploads%2F2016%2F01%2Fhakkanoodles2.jpg%3Fssl%3D1&f=1&nofb=1&ipt=dbe96c7458a340f0db1daa85c0e98555d0102e35477a64b21b8dbf47a2c1b8d1",
      category: "Main Course",
    },
    {
      id: "f9",
      name: "Margherita Pizza",
      price: 300,
      calories: 650,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fparimadretseptid.ee%2Fwp-content%2Fuploads%2F2023%2F10%2FMargherita-pizza-retsept.jpg&f=1&nofb=1&ipt=aa024ed4d954923dc7c0f6762e4d243744887e61e269a52db2c1a17e49678c0e",
      category: "Main Course",
    },
    {
      id: "f10",
      name: "Classic French Fries",
      price: 100,
      calories: 350,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.fanpage.it%2Fwp-content%2Fuploads%2Fsites%2F22%2F2020%2F09%2FiStock-618214356.jpg&f=1&nofb=1&ipt=dc2070744b47705c947dd83bda363fd75376923ded629d7e4cd5252713cbb94c",
      category: "Main Course",
    },

    // --- DESSERTS (Indian & Global) ---
    {
      id: "f3",
      name: "Chocolate Brownie",
      price: 120,
      calories: 320,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fbrownies-with-chocolate-crust-80blasp2gdckyx89.jpg&f=1&nofb=1&ipt=54c5f24c651b65b11b4d5343e9a39ad18dcb8e0d93e13c14c8b185bf0836a79e",
      category: "Desserts",
    },
    {
      id: "f11",
      name: "Gulab Jamun (2 pcs)",
      price: 80,
      calories: 250,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frecipes.net%2Fwp-content%2Fuploads%2F2023%2F05%2Fgulab-jamun-recipe_9fb159dc2674f395436a64666227c988-768x768.jpeg&f=1&nofb=1&ipt=6736026c0df70ffed3045187b83420a610348bec8268b047a1fa42c4bf8164d2",
      category: "Desserts",
    },
    {
      id: "f12",
      name: "Vanilla Ice Cream",
      price: 100,
      calories: 280,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fichef.bbci.co.uk%2Ffood%2Fic%2Ffood_16x9_832%2Frecipes%2Frealvanillaicecream_14294_16x9.jpg&f=1&nofb=1&ipt=6ea8d3f76fbe56a39ac49b905f9f1722bdc9e21cb61d50597cf71763a3070f79",
      category: "Desserts",
    },
    {
      id: "f13",
      name: "Rasgulla (3 pcs)",
      price: 90,
      calories: 220,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F8980235.jpg&f=1&nofb=1&ipt=9e724118b047cc0bf670037346e236ce73a3b5fb5e2fc4b29cfb3e0ca58324f2",
      category: "Desserts",
    },
    {
      id: "f14",
      name: "Cheesecake Slice",
      price: 180,
      calories: 450,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thelittleepicurean.com%2Fwp-content%2Fuploads%2F2019%2F10%2Fcoffee-mousse-cheesecake-slice-1.jpg&f=1&nofb=1&ipt=cd685bde62e5877b090dc21d8d41f0d1fe4bd01152efa847310d98e46d369d3d",
      category: "Desserts",
    },

    // --- DRINKS (Indian & Global) ---
    {
      id: "f4",
      name: "Mango Lassi",
      price: 90,
      calories: 200,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.tmecosys.com%2Fimage%2Fupload%2Ft_web767x639%2Fimg%2Frecipe%2Fras%2FAssets%2F6A808BB0-210D-4A71-9BD5-5F602437232F%2FDerivates%2F37E049D3-4AEC-44FB-A1E4-17C951AA4623.jpg&f=1&nofb=1&ipt=667f653cde7b3c03571c3d6dca74b71ac167461a995f6fa3328e32f5e5712116",
      category: "Drinks",
    },
    {
      id: "f15",
      name: "Masala Chai",
      price: 60,
      calories: 120,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffoodandroad.com%2Fwp-content%2Fuploads%2F2021%2F04%2Fmasala-chai-indian-drink-3.jpg&f=1&nofb=1&ipt=99378f1b7f7a57d2236ad4f91bd4a92206bb5bc0c045f701d734a6f6c2bb1dbd",
      category: "Drinks",
    },
    {
      id: "f16",
      name: "Fresh Lime Soda",
      price: 70,
      calories: 150,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ndtv.com%2Fcooks%2Fimages%2Flime-soda-620.jpg&f=1&nofb=1&ipt=f53ab7cc7e6e3dbdd3890fa7748c6b10134b8d854b47bd44c7aa36b30de17b75",
      category: "Drinks",
    },
    {
      id: "f17",
      name: "Cold Coffee",
      price: 130,
      calories: 280,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Frealfood.tesco.com%2Fmedia%2Fimages%2FRFO-1400x919-IcedCoffee-76221116-2565-4103-9899-89571028018e-0-1400x919.jpg&f=1&nofb=1&ipt=25123ca602d86ee009030751d27693d1238fd5d0d0ebb5219081f296e96cd9b0",
      category: "Drinks",
    },
    {
      id: "f18",
      name: "Diet Coke",
      price: 80,
      calories: 0,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvygrnews.com%2Fupload%2Fblog%2Fbanner%2Foriginal%2F1682756733213062315.PNG&f=1&nofb=1&ipt=026a1048598fce5f9a81f6ae2db84e1a9530349f7d2325b2833c672af22f132a",
      category: "Drinks",
    },
    {
      id: "f19",
      name: "MONSTER",
      price: 110,
      calories: 180,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0686%2F3371%2Fproducts%2Fimage_8599e1ea-1401-4d03-ba8f-06451c45a814_800x.jpg%3Fv%3D1636007141&f=1&nofb=1&ipt=ba12390c2e8fd114400523e9eac7754504bc9e4395374c4f1c96427c7b424ed4", // Reusing image placeholder
      category: "Drinks",
    },
    {
      id: "f20",
      name: "Buttermilk (Chaas)",
      price: 50,
      calories: 80,
      spice: "Mild",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.indianexpress.com%2F2022%2F09%2Fcurd.jpg&f=1&nofb=1&ipt=4efa88801e1bd990654f649712876d4c765a7560596ed46a865e14cbd6d0a821", // Reusing image placeholder
      category: "Drinks",
    },
  ];

  return (
    <FoodItemContext.Provider value={foodItems}>
      {children}
    </FoodItemContext.Provider>
  );
};

export const useFoodItems = () => useContext(FoodItemContext);