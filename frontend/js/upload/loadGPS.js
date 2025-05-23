export default async function loadGPS() {
    const resultElement = document.getElementById("show-result");
    const inputField = document.getElementById("loadGPS_inputField");
    const frame_index = inputField.value.trim();
  
    // Validate input
    if (!frame_index) {
      resultElement.textContent = "Please enter a coordinate first.";
      return;
    }
  
    if (isNaN(parseInt(frame_index))) {
      resultElement.textContent = "Please enter a valid coordinate.";
      return;
    }
  
    resultElement.textContent = `Loading GPS coordinates: ${frame_index}`;
  
    try {
      // Call the API to generate images
      const response = await fetch("http://localhost:5000/api/loadGPS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame_index }),
      });
  
      const result = await response.json();
  
      if (!result.success) {
        resultElement.textContent = "Loading GPS coordinates failed. Please try again.";
        return;
      }
  
      resultElement.textContent = "Coordinates loaded successfully!";
      console.log(`\x1b[36m%s\x1b[0m`, "Loadding result:");
      console.log(`\x1b[36m%s\x1b[0m`, result.message);
  
      // ------- Optionally refresh image displays or update UI elements
      const imageElements = document.querySelectorAll(".generated-image");
      if (imageElements.length > 0) {
        // Add a timestamp parameter to force browser to reload images
        const timestamp = new Date().getTime();
        imageElements.forEach((img) => {
          const src = img.src.split("?")[0]; // Remove any existing query params
          img.src = `${src}?t=${timestamp}`;
        });
      }
      // ------- Optionally refresh image displays or update UI elements
    } catch (error) {
      resultElement.textContent = "An error occurred during image generation. Please try again.";
      console.error("Error during image generation:", error);
    }
  }
  
