const express = require("express");
const cors = require("cors");
const Replicate = require("replicate");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/replicate", async (req, res) => {
  const { results, prompt } = req.body;

  if (!results || !prompt) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const replicate = new Replicate({
    auth: "r8_SM5yF2PEwnrgdQ2qqC6V0IcMnzQPBvm0eGjbB",
  });

  try {
    const output = await replicate.run("mistralai/mixtral-8x7b-instruct-v0.1", {
      input: {
        prompt: `These are the vector database results: ${results}. This is the prompt: ${prompt}. Please provide an answer according to the prompt. be more straight to the point and accurate dont write that its based on the database just write the best answer in the sentence`,
        temperature: 0.6,
        max_new_tokens: 1024,
      },
    });
    //  console.log(output)
    // Post-process the output to form a complete sentence
    const sentence = output;
    res.json({ output: sentence });
  } catch (error) {
    console.error("Error during replication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/sentiment", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const replicate = new Replicate({
    auth: "r8_SM5yF2PEwnrgdQ2qqC6V0IcMnzQPBvm0eGjbB",
  });

  try {
    const output = await replicate.run("mistralai/mixtral-8x7b-instruct-v0.1", {
      input: {
        prompt: `What do you think is the sentiment of the person (Good/Bad) on the basis of these messages sent by user ${message}.Give one word answer`,
        temperature: 0.6,
        max_new_tokens: 1024,
      },
    });
    console.log(output);

    const hasBad = output.some(
      (item) => item.toLowerCase() === "bad".toLowerCase()
    );

    const response = hasBad ? "Bad" : "Good";

    res.json({ output: response });
  } catch (error) {
    console.error("Error during replication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
