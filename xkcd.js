function getUrl(id) {
  return `https://xkcd.com/${id}/info.0.json`;
}

async function fetchRawComic(id) {
  const response =  await fetch(getUrl(id));
  const rawComic = await response.json()
  return rawComic;
}

async function getComic(id) {
  const raw = await fetchRawComic(id);
  const comic = {
    title: raw.title,
    image: { uri: raw.img },
    alt: raw.alt,
  };
  return comic;
}

export default { getComic };
