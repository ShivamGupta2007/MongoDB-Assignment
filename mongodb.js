// {

//   "address": {

//   "building": "1007",

//   "coord": [ -73.856077, 40.848447 ],

//   "street": "Mall Road Mussorrie",

//   "zipcode": "10462"

//   },

//   "cuisine": "Bakery",

//   "grades": [

//   { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },

//   { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },

//   { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },

//   { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },

//   { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }

//   ],

//   "name": "Morris Bake Shop",

//   "restaurant_id": "30075445"

//   }

//   Create 20 more documents with above schema and add in 'restaurant' collection in MongoDB. Add some entries where name of restaurant starting with Cafeteria. Add scores for some Restaurant more than 80 less than 100.

//Q1. Write a MongoDB query to display the fields restaurant_id, name, and zip code but
//exclude the field _id for all the documents in the collection restaurant.

db.restaurants.find(
  {},
  { restaurant_id: 1, name: 1, cuisine: 1, "address.zipcode": 1, _id: 0 }
);

//Q2. Write a MongoDB query to arrange the name of the restaurants in ascending
//order along with all the columns.

db.restaurants.find({}, { _id: 0, name: 1 }).sort({ name: 1 });

//Q3. Write a MongoDB query to display the first 5 restaurant in ascending order of name field.

db.restaurants.find({}, { _id: 0 }).sort({ name: 1 }).limit(5).pretty();

//Q4. Write a MongoDB query to display the next 5 restaurants after skipping first 5.

db.restaurants.find({}, { _id: 0 }).sort({ name: 1 }).skip(5).limit(5).pretty();

//Q5. Write a MongoDB query to find the restaurants who achieved a score more than 90.

db.restaurants.find({ "grades.score": { $gt: 90 } });

//Q6. Write a MongoDB query to find the restaurants that achieved a score, more
//than 80 but less than 100.

db.restaurants.find({
  $and: [{ "grades.score": { $gt: 90 } }, { "grades.score": { $lt: 100 } }],
});

//Q7. Write a MongoDB query to find the restaurant name, longitude and latitude
//and cuisine for those restaurants which contain 'Caf' as first three letters of its name.

db.restaurants.find(
  { name: { $regex: /^Caf.*/ } },
  { _id: 0, name: 1, cuisine: 1, "address.coord": 1 }
);

//Q8. Write a MongoDb query to update grade B to A in all documents.

db.restaurants.updateMany(
  { "grades.grade": "B" },
  { $set: { "grades.$.grade": "A" } }
);
