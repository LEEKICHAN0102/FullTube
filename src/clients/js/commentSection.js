const form = document.getElementById("commentForm");
const textarea=form.querySelector("textarea");
const btn=form.querySelector("button");

const handleSubmit=(event)=>{
  event.preventDefault();
  const text=textarea.value;
}


btn.addEventListener("submit",handleSubmit);