const list = document.getElementById("list");
const category_filter = document.getElementById("category_filters");

const getData = async (filter = "") => {
  try {
    data = await axios.get(
      "http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true"
    );
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

let render_data = async () => {
  let api_data = await getData();
  await api_data.forEach((ele) => {
    let card = new Card(ele.fname, ele.lname, ele.category);
    card.render();
  });
  return api_data
};
let data=render_data();

class Card {
  constructor(f_name, l_name, category) {
    this.f_name = f_name;
    this.l_name = l_name;
    this.category = category;
  }
  render() {
    let card = document.createElement("div");
    list.appendChild(card);
    card.className = "card";

    // profile pic  section
    let profile_pic = document.createElement("div");
    profile_pic.className = "profile_pic";
    let img = document.createElement("img");
    img.setAttribute("src", "assets/profile_pic.png");
    profile_pic.appendChild(img);
    img.className = "profile_img";
    card.appendChild(profile_pic);
    let initals = document.createElement("p");
    initals.classList.add("initals");
    initals.textContent = this.f_name.charAt(0) + this.l_name.charAt(0);
    profile_pic.appendChild(initals);

    // name section

    let name = document.createElement("h3");
    name.textContent = `${this.f_name} ${this.l_name}`;
    card.appendChild(name);

    // category section

    let category = document.createElement("button");
    category.classList.add("category");
    category.textContent = this.category;
    card.appendChild(category);

    category.addEventListener("click", (e) => filterData(e));
  }
}

category_filter.addEventListener("click", (e) => filterData(e));

filterData = (e) => {
  list.innerHTML = "";
  api_data=  data.data.filter(ele=> ele.category==e.target.textContent)
    api_data.forEach(ele=>{
        let card=new Card(ele.fname,ele.lname,ele.category);
        card.render() 
       })

};

