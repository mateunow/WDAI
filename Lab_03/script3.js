const getJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

let originalData = [];
let filteredData = [];

function renderTable(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach((product) => {
    const row = document.createElement("tr");

    const thumbnailCell = document.createElement("td");
    const titleCell = document.createElement("td");
    const descCell = document.createElement("td");

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    img.style.width = "100px";
    thumbnailCell.appendChild(img);

    titleCell.textContent = product.title;
    descCell.textContent = product.description;

    row.appendChild(thumbnailCell);
    row.appendChild(titleCell);
    row.appendChild(descCell);
    tableBody.appendChild(row);
  });
}

getJSON("https://dummyjson.com/products").then((responseData) => {
  originalData = responseData.products.slice(0, 30);
  filteredData = [...originalData];
  renderTable(filteredData);
});

document.getElementById("filter-input").addEventListener("input", (e) => {
  const filterText = e.target.value.toLowerCase();
  filteredData = originalData.filter((product) =>
    product.title.toLowerCase().includes(filterText)
  );
  //nie wiedziałem czy szukamy w samym tytule czy też description więc tu dodałem te 3 linijki na sortowanie i szukanie w description, jeśli potrzebujemy
  //szukać również w opisie trzeba je odcommitować

  filteredData = originalData.filter((product) =>
    product.description.toLowerCase().includes(filterText)
  );
  renderTable(filteredData);
});

document.getElementById("sort-select").addEventListener("change", (e) => {
  const sortOption = e.target.value;
  if (sortOption === "asc") {
    filteredData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "desc") {
    filteredData.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    filteredData = [...originalData];
  }
  renderTable(filteredData);
});
