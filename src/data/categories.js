import Fruits from "../assets/Categories/Fruits.png";
import Kitchen_Equipment from "../assets/Kitchen Equipment.png";
import Shampoo from "../assets/Shampoo.png";
import Breads from "../assets/Categories/Bread.png";
import Fishs from "../assets/Categories/Fishs.png";
import Vegetables from "../assets/Categories/Vegetable.png";
import Sea_Foods from "../assets/Categories/Sea Foods.png";
import Drinks from "../assets/Categories/Drinks.png";
import Juices from "../assets/Categories/Juices.png";
import Ice_Creams from "../assets/Categories/Ice Cream.png";
import Meats from "../assets/Categories/Meats.jpg";
import Jams from "../assets/Categories/Jams.png";
import Fruit_202 from "../assets/Fruits/ផ្លែឈឺរី ៤៥០ក.jpg";
import Fruit_217 from "../assets/Fruits/ផ្លែរ៉ាសប៊ែរី.png";
import Fruit_214 from "../assets/Fruits/ផ្លែស្រ្តបឺរីកូរ៉េ.jpg";
import Fruit_196 from "../assets/Fruits/ផ្លែចេកអំបូងលឿងMPRO ១ស្និត.jpg";
import Fruit_195 from "../assets/Fruits/Avocado.webp";
import Dis_Drinks from "../assets/Discount/Drinks.jpg";
import Dis_Fruits from "../assets/Discount/Fruits.jpg";
import Dis_Meats from "../assets/Discount/Meats.jpg";
import Dis_Jams from "../assets/Discount/Jams.jpg";
import Review_Profile from "../assets/Categories/Review_Profile.png";
import Julina_Profile from "../assets/Categories/Julina.webp";
import Skincare from "../assets/Skincare.png";
import Coffee from "../assets/Coffee.png";
import Food1 from "../assets/Food1.png";
import Food2 from "../assets/Food2.png";
import Food3 from "../assets/Food3.png";
import Food4 from "../assets/Food4.png";
import Food5 from "../assets/Food5.png";

const Categories_product = [
  {
    id: "C1",
    image: Fruits,
    textName: "Fruits",
  },
  {
    id: "C12",
    image: Shampoo,
    textName: "Shampoo",
  },
  {
    id: "C2",
    image: Vegetables,
    textName: "Vegetables",
  },
  {
    id: "C3",
    image: Breads,
    textName: "Breads",
  },
  {
    id: "C4",
    image: Fishs,
    textName: "Fishs",
  },
  {
    id: "C5",
    image: Meats,
    textName: "Meats",
  },
  {
    id: "C13",
    image: Skincare,
    textName: "Skin care",
  },
  {
    id: "C6",
    image: Sea_Foods,
    textName: "Sea Foods",
  },
  {
    id: "C7",
    image: Drinks,
    textName: "Drinks",
  },
  {
    id: "C8",
    image: Ice_Creams,
    textName: "Ice Creams",
  },
  {
    id: "C9",
    image: Juices,
    textName: "Juices",
  },
  {
    id: "C14",
    image: Coffee,
    textName: "Coffee",
  },
  {
    id: "C10",
    image: Jams,
    textName: "Jams",
  },
  {
    id: "C11",
    image: Kitchen_Equipment,
    textName: "Kitchen Equipment",
  },
];
const Popular_Product = [
  {
    id: 202,
    product_type: "ផ្លែឈើ/Fruit",
    product_name: "ផ្លែឈឺរី ៤៥០ក",
    product_image: Fruit_202,
    product_price: "$11.55",
    quality: "Best qaulity in our Mart",
    pre: "/ នីមួយ",
  },
  {
    id: 218,
    product_type: "ផ្លែឈើ/Fruit",
    product_name: "ផ្លែរ៉ាសប៊ែរី 200ក្រាម",
    product_image: Fruit_217,
    product_price: "$8.50",
    quality: "Best qaulity in our Mart",
    pre: "/ នីមួយ",
  },
  {
    id: 196,
    product_type: "ផ្លែឈើ/Fruit",
    product_name: "ផ្លែចេកអំបូងលឿងMPRO ១ស្និត",
    product_image: Fruit_196,
    product_price: "$2.90",
    quality: "Best qaulity in our Mart",
    pre: "/ នីមួយ",
  },
  {
    id: 215,
    product_type: "ផ្លែឈើ/Fruit",
    product_name: "ផ្លែស្រ្តបឺរីកូរ៉េ 300 ក្រាម",
    product_image: Fruit_214,
    product_price: "$14.90",
    quality: "Best qaulity in our Mart",
    pre: "/ នីមួយ",
  },
  {
    id: 195,
    product_type: "ផ្លែឈើ/Fruit",
    product_name: "ផ្លែប័រ ១ ផ្លែ",
    product_image: Fruit_195,
    product_price: "$2.20",
    quality: "Best qaulity in our Mart",
    pre: "/ នីមួយ",
  },
];
const Product_Discount = [
  {
    id: "D1",
    image: Dis_Drinks,
    textDis: "35% Discount",
    textOrder: "Order any food from website and get the discount",
    shop: "Shop now",
  },
  {
    id: "D2",
    image: Dis_Fruits,
    textDis: "20% Discount",
    textOrder: "Order any food from website and get the discount",
    shop: "Shop now",
  },
  {
    id: "D3",
    image: Dis_Meats,
    textDis: "15% Discount",
    textOrder: "Order any food from website and get the discount",
    shop: "Shop now",
  },
  {
    id: "D4",
    image: Dis_Jams,
    textDis: "10% Discount",
    textOrder: "Order any food from website and get the discount",
    shop: "Shop now",
  },
];
const Review_Product = [
  {
    id: "R1",
    profile: Review_Profile,
    username: "Baby",
    text_review:
      "I picked this up on a whim, and I’m so glad I did. The flavor is rich and satisfying, and it tasted super fresh. Great as a quick snack or to share with friends. Will be buying this again on my next trip!",
  },
  {
    id: "R2",
    profile: Julina_Profile,
    username: "Julina",
    text_review:
      "This detergent is powerful and gets the job done with minimal effort. Smells great, doesn’t leave any residue, and works on tough stains too. A must-have for every home. Excellent value for the price!",
  },
  {
    id: "R3",
    profile: Julina_Profile,
    username: "Julina",
    text_review:
      "This detergent is powerful and gets the job done with minimal effort. Smells great, doesn’t leave any residue, and works on tough stains too. A must-have for every home. Excellent value for the price!",
  },
];
const bannerImage = [Food1, Food2, Food3, Food4, Food5];
export {
  Categories_product,
  Popular_Product,
  Product_Discount,
  Review_Product,
  bannerImage,
};
