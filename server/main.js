import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { WebApp } from "meteor/webapp";
import express from "express";

export async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

const app = express();

WebApp.connectHandlers.use(app);

// If the Links collection is empty, add some data.
if ((await LinksCollection.find().countAsync()) === 0) {
  await insertLink({
    title: "Do the Tutorial",
    url: "https://www.meteor.com/tutorials/react/creating-an-app",
  });

  await insertLink({
    title: "Follow the Guide",
    url: "https://guide.meteor.com",
  });

  await insertLink({
    title: "Read the Docs",
    url: "https://docs.meteor.com",
  });

  await insertLink({
    title: "Discussions",
    url: "https://forums.meteor.com",
  });
}

// We publish the entire Links collection to all clients.
// In order to be fetched in real-time to the clients
Meteor.publish("links", function () {
  return LinksCollection.find();
});

app.get("/links", async (req, res) => {
  console.log("Query: ", req.query);
  if (req.query === undefined) {
    res.status(400).send("Query is required");
    return;
  }
  const links = await LinksCollection.find().fetchAsync();
  res.json(links);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke: " + err.message);
});
