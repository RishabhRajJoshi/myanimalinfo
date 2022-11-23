const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path")

const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

var data = {
  firstImage: null,
  titleName : null,
  fact: null,
  scientificName: null,
  kingdom: null,
  phylum: null,
  className: null,
  order: null,
  family: null,
  genus: null,

  lifespan: null,
  weight: null,
  length: null,
  type: null,
  diet: null,
  color: null,
  habitat: null,
  location: null,

 
};


var news ={


  firstNews: null,
  firstLink: null,

  secondNews: null,
  secondLink: null,

  thirdNews: null,
  thirdLink: null,

  fourthNews: null,
  fourthLink: null,
}

app.get("/", function (req, res) {
  res.render("index", {
    firstImage: null,
    titleName : null,
    fact: null,
    scientificName: null,
    kingdom: null,
    phylum: null,
    className: null,
    order: null,
    family: null,
    genus: null,
  
    lifespan: null,
    weight: null,
    length: null,
    type: null,
    diet: null,
    color: null,
    habitat: null,
    location: null,

    firstNews: null,
  firstLink: null,

  secondNews: null,
  secondLink: null,

  thirdNews: null,
  thirdLink: null,

  fourthNews: null,
  fourthLink: null,
  });
});

app.post("/", function (req, res) {
  var animal = req.body.animal;
  console.log(animal);
  const userAgent = req.get("user-agent");

  var options3 = {
    method: "GET",
    url:
      "https://newsapi.org/v2/everything?q=" +
      animal +
      "&sortBy=publishedAt&searchIn=title&language=en",
    headers: {
      "X-Api-Key": "7b3ac09f50a4412ab39aefbb5707c4f7",
      "User-Agent": userAgent,
    },
  };



  request(options3, function (error, response) {
    if (error) throw new Error(error);

    

    const body = JSON.parse(response.body);


    if(body.totalResults  === 0)
    {
      res.redirect("/");
    }
    else{

      const firstNews = body.articles[0].title;
    const firstLink = body.articles[0].url;

    const secondNews = body.articles[1].title;
    const secondLink = body.articles[1].url;

    const thirdNews = body.articles[2].title;
    const thirdLink = body.articles[2].url;

    const fourthNews = body.articles[3].title;
    const fourthLink = body.articles[3].url;

    news.firstNews = firstNews;
    news.firstLink = firstLink;

    news.secondNews = secondNews;
    news.secondLink = secondLink;

    news.thirdNews = thirdNews;
    news.thirdLink = thirdLink;

    news.fourthNews = fourthNews;
    news.fourthLink = fourthLink;

    console.log(news)
     console.log(data);

    }
    
    
  });








  var options1 = {
    method: "GET",
    url: "https://api.api-ninjas.com/v1/animals?name=" + animal,
    headers: {
      "X-Api-Key": "PrX3/tsObSWE0U7yrml9aQ==RUydd8GDi21gbghM",
    },
  };

  request(options1, function (error, response) {
    if (error) throw new Error(error);
    

    const body = JSON.parse(response.body);
  if(body === undefined)
    {
      res.redirect("/");
    }
    else{
    const first = body[0];


    /// animal-info
    const titleName = first.name;
    const scientificName = first.taxonomy.scientific_name;
    const kingdom = first.taxonomy.kingdom;
    const phylum = first.taxonomy.phylum;
    const className = first.taxonomy.class;
    const order = first.taxonomy.order;
    const family = first.taxonomy.family;
    const genus = first.taxonomy.genus;
    console.log(
      scientificName,
      kingdom,
      phylum,
      className,
      order,
      family,
      genus
    );
    data.titleName= titleName;
    data.scientificName = scientificName;
    data.kingdom = kingdom;
    data.phylum = phylum;
    data.className = className;
    data.order = order;
    data.family = family;
    data.genus = genus;

    // animal-discription

    const characteristics = first.characteristics;

    const lifespan = characteristics.lifespan;
    const weight = characteristics.weight;
    const length = characteristics.length;
    const type = characteristics.type;
    const diet = characteristics.diet;
    const color = characteristics.color;
    const habitat = characteristics.habitat;
    const location = characteristics.location;

    console.log(lifespan, weight, length, type, diet, color, habitat, location);
   

    data.lifespan = lifespan;
    data.weight = weight;
    data.length = length;
    data.type = type;
    data.diet = diet;
    data.color = color;
    data.habitat = habitat;
    data.location = location;

    // animal-fact
    var fact = body[0].characteristics.slogan;

    for (var i = 1; i < body.length; i++) {
      if (fact === undefined) {
        fact = body[i].characteristics.slogan;
      } else {
        console.log(fact);
        break;
      }
    }

    data.fact = fact;
  });

  var options2 = {
    method: "GET",
    url: "https://imsea.herokuapp.com/api/1?q=" + animal,
    headers: {},
  };
  request(options2, function (error, response) {
    if (error) throw new Error(error);
    const body = JSON.parse(response.body);

    const firstImage = body.results[0];

    console.log(firstImage);

    data.firstImage = firstImage;

    res.render("index", {
      firstImage: data.firstImage,
      titleName: data.titleName,
      fact: data.fact,
      scientificName: data.scientificName,
      kingdom: data.kingdom,
      phylum: data.phylum,
      className: data.className,
      order: data.order,
      family: data.family,
      genus: data.genus,

      lifespan: data.lifespan,
      weight: data.weight,
      length: data.length,
      type: data.type,
      diet: data.diet,
      color: data.color,
      habitat: data.habitat,
      location: data.location,

      firstNews: news.firstNews,
      firstLink: news.firstLink,

      secondNews: news.secondNews,
      secondLink: news.secondLink,

      thirdNews: news.thirdNews,
      thirdLink: news.thirdLink,

      fourthNews: news.fourthNews,
      fourthLink: news.fourthLink,
    });




  }



  });

  
  
 
});

app.listen(process.env.PORT || 3000 , function () {
  console.log("server started on port 3000");
});

