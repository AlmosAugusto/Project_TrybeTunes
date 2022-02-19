const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  const data = requestJson.results;
  /* console.log(data); */
  return data;
};

export default getMusics;
