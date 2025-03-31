import fetch from 'node-fetch';

// api: https://www.csscolorsapi.com/api/colors/group/
// sample request: https://www.csscolorsapi.com/api/colors/group/yellow?theme=light
// css colors api provides a list of colors; can be grouped by color names, you can also choose light or dark themes
// the API returns a list of colors in the group, each color has a name and hex code

// map Watson NLU emotions to color groups
const emotionToColorGroup = {
  joy: 'yellow',
  sadness: 'blue',
  fear: 'purple',
  anger: 'red',
  disgust: 'green'
};

// getGradientColors function takes an emotion and returns a gradient color based on the emotion

async function getGradientColors(emotion) {
  const group = emotionToColorGroup[emotion] || 'gray';

  try {
    const res = await fetch(`https://csscolorsapi.com/api/colors/group/${group}?theme=light`);
    const data = await res.json();
    const pastelColors = data.colors.filter(c => c.theme === 'light');

    if (Array.isArray(pastelColors) && pastelColors.length >= 2) {
      const randomIndex1 = Math.floor(Math.random() * pastelColors.length);
      const randomIndex2 = Math.floor(Math.random() * pastelColors.length);
      return [pastelColors[randomIndex1].hex, pastelColors[randomIndex2].hex];
    }
  } catch (err) {
    console.error("Color API failed:", err.message);
  }

  // fallback colors
  return ['#f4f4f4', '#ffffff'];
}

// export functions
export default getGradientColors;