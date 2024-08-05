// In this file I will play around with Redis and understand how it works.

// Plan
// [X] Introduction to Redis Client - we will setup a redis client in node js and connect it to our local redis instance
// [X] Basic Redis Operations - CRUD operations
// [X] Work with Redis Data Structures - String, Lists, Sets, Hashes, Sorted Sets
// 4. Redis Queue - Handling notifications

// Setup a redis client
const redis = require("redis"); // npm install redis
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  retry_strategy: (options) => {
    console.log("Retry strategy called", options);
    return 1000;
  },
});

// Give the configuration of my redis server that my client needs to connect to

client.on("connect", () => {
  // do anything in this function, this function gets triggered on the event of 'connect' for redis client
  console.log("Connected to Redis");
});

client.on("ready", () => {
  console.log("Redis client is ready to use");
});

client.on("reconnecting", () => {
  console.log("Redis client is reconnecting");
});

client.on("end", () => {
  console.log("Redis client connection has ended");
});

client.on("error", (err) => {
  // do anything in this function when the redis connection meets an error
  console.log("Redis error: " + err);
});

const handleCallback = (err, reply) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(reply);
};

// Data Structures
// String: key(string) - value(string)
// List: key(string) - value(array)
// Set: key(string) - value(set)
// Hash: key(string) - { field(string), value(any) }    // any means it can be any datatype

// CRUD operations (Redis suports data storage into key-value pairs)
// SET a value, GET a value and DEL a value

// in setter function the syntax is set(key, value, callback)
client.set("title", "celzene", (err, reply) => handleCallback(err, reply));

// SET title celzene

// in getter function, the syntax is get(key, callback)
client.get("title", (err, reply) => handleCallback(err, reply));

// GET title

// in delete function, the syntax is del(key, callback)
client.del("title", (err, reply) => handleCallback(err, reply));

// DEL title

// Lists
// Function to push values inside a list
// the syntax of rpush is rpush(key, ...values, callback)
client.rpush(
  "title-list",
  "value1",
  "value2",
  "value3",
  "value4",
  (err, reply) => handleCallback(err, reply)
);

// RPUSH title-list value1 value2 value3 value4

// Function to retreive all the list values
// the syntax of lrange is lrange(key, startingIndex, endingIndex, callback)
client.lrange("title-list", 0, -1, (err, reply) => handleCallback(err, reply));

// LRANGE title-list 0 -1

// Sets
// Add members to the set
// the syntax of sadd is sadd(key, ...values, callback)
client.sadd("title-set", "value1", "value2", "value3", (err, reply) =>
  handleCallback(err, reply)
);

// SADD title-set value1 value2 value3

// Function to retreive all the items in a set
client.smembers("title-set", (err, reply) => handleCallback(err, reply));

// SMEMBERS title-set

// Hashes
// Set fields in a hash
// The syntax for hset is hset(key, field1, value1, field2, value2, ..., callback)
client.hset(
  "title-hash",
  "field1",
  "value1",
  "field2",
  false,
  "field3",
  ["1", 2, 3],
  (err, reply) => handleCallback(err, reply)
);

// HSET title-hash field1 value1 field2 false field3 "['1', 2, 3]"

// Retreive all the hash fields
// The syntax of hgetall is hgetall(key, callback)
client.hgetall("title-hash", (err, reply) => handleCallback(err, reply));

// HGETALL title-hash

// Retreive a given field from my hash set
// The syntax of hget is hget(key, field, callback)
client.hget("title-hash", "fieldname", (err, reply) =>
  handleCallback(err, reply)
);

// HGET title-hash field3

// Designing the notification using Redis. Notification are getting stored for users inside Redis, you need to design a mechanism that transfers notifications to users both in real time or whenever they login or switch on their devices.
// Approach
// Store the notification inside the list
// HSET : Key(notification) : Fields(user_id) : Values(notification string)
// HSET : Key(notification) : Fields(aksh45) : Values("Your order of 2000$ is shipped")

// [Non Real Time] Once the client passes their userid to the redis server, the redis server finds the user id from the key and return the notification value back to the client.
// [Real Time] Since the client is already connected and has passed their userid to the redis server, the notification that gets created, gets immediately sent to the client.
