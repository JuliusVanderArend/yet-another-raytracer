async function loadVox(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    // console.log(data);
    return data
  } catch (err) {
    console.error(err);
  }
}
