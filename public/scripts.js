const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');

window.addEventListener('load', event => {
  loadLinks();
});


function addElement(favorito,i) {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const trash = document.createElement("span");

    a.href = favorito.url;
    a.innerHTML = favorito.nome;
    a.target = "_blank";

    li.className = 'link';

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(i);

    li.append(a);
    li.append(trash);
    ul.append(li);
}

function removeElement(i) {
    if (confirm('Tem certeza que deseja deletar?')) {
      fetch('http://localhost:3000/favoritos/'+i,{
        method: "delete"
      })
      .then(() => {
        loadLinks();
      });
    }   
}

function loadLinks() {
  fetch('http://localhost:3000/favoritos')
  .then(result => {
    return result.json(); 
  })
  .then(json => {
    const lis = document.querySelectorAll('li.link').forEach(elem=>{
        elem.parentNode.removeChild(elem);
      });
    json.forEach((favorito,i) => {
      addElement(favorito,i);
    });
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { value } = input;

  if (!value) {
    return alert('Preencha o campo');
  }

  const [name, url] = value.split(",")

  if (!url) {
    return alert('formate o texto da maneira correta');
  }

  if (!/^http/.test(url)) {
    return alert("Digite a url da maneira correta");
  } 

  fetch('http://localhost:3000/favoritos',{
    method: "post",
    body: JSON.stringify({nome: name, url: url})
  })
  .then(json => {
    input.value = "";
    loadLinks();
  });

  
});