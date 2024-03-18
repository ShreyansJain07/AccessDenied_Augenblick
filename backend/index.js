const express = require('express');
const cors = require('cors');
const Replicate = require('replicate');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/replicate', async (req, res) => {
  const { imageDataURL, prompt } = req.body;

  if (!imageDataURL || !prompt) {
    return res.status(400).json({ error: 'Image data URL or prompt is missing.' });
  }

  // Assuming 'Replicate' is configured correctly
  const replicate = new Replicate({
    auth:"r8_SM5yF2PEwnrgdQ2qqC6V0IcMnzQPBvm0eGjbB", // Replace with your actual authentication key
  });

  try {
    const output = await replicate.run(
        "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117", // Replace with your actual model ID
      {
        input: {
          eta: 0,
          image: imageDataURL,
          scale: 9,
          prompt: prompt,
          a_prompt: "best quality, extremely detailed", 
          n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality,unrealistic, saturated, high contrast, big nose, painting, drawing, sketch, cartoon, anime, manga, render, CG, 3d, watermark, signature, label",
          ddim_steps: 20,
          num_samples: "1",
          image_resolution: "512"
        }
      }
    );
    res.json({ output : output[1] });
  } catch (error) {
    console.error("Error during replication:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
