const fetch = require("node-fetch");

const IDs = ["flatten-settimeout", "split-array-chunks"];

(async () => {
  const results = await Promise.all(
    IDs.map(async (id) => {
      const fetchData = await fetch(
        `https://puruvj.dev/api/get-emos?blogID=${id}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      return fetchData;
    }).map((res) => res.json())
  );

  console.log(results);
})();
