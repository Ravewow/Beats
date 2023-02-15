// ymaps.ready(init);
// function init(){
//     var myMap = new ymaps.Map("map", {
//         center: [55.742262, 37.598628],
//         zoom: 14.33,
//         controls: []
//     });
// }

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.742262, 37.598628],
    zoom: 14.33,
    controls: [],
  });

  const coords = [
    [55.755575, 37.582903],
    [55.739807, 37.58304],
    [55.756734, 37.624288],
    [55.750527, 37.606578],
  ];

  const myCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false,
      iconLayout: "default#image",
      iconImageHref: "./img/decor/pin_image.png",
      iconImageSize: [46, 57],
      iconImageOffset: [-35, -52],
    }
  );

  coords.forEach((coord) => {
    myCollection.add(new ymaps.Placemark(coord));
  });
  myMap.geoObjects.add(myCollection);
  myMap.behaviors.disable("scrollZoom");
};

ymaps.ready(init);
