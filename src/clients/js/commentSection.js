const videoContainer=document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment=(text,id)=>{
  const videoComments=document.querySelector(".video__comments ul");
  const newComment=document.createElement("li");
  newComment.dataset.id=id;
  newComment.className="video__comment";
  const span = document.createElement("span");
  span.innerText= ` ${text}`;
  const deleteBtn = document.createElement("span");
  deleteBtn.className="comment__deleteBtn";
  deleteBtn.innerText="❌";
  newComment.appendChild(span);
  newComment.appendChild(deleteBtn);
  videoComments.prepend(newComment);
}

const handleSubmit=async(event)=>{
  event.preventDefault();
  const textarea=form.querySelector("textarea");
  const text=textarea.value;
  const videoId=videoContainer.dataset.id;
  if(text===""){
    return;
  }
  const response=await fetch(`/api/video/${videoId}/comment`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({text}),
  });
  if(response.status===201){
    textarea.value="";
    const {newComment}=await response.json();
    console.log(newComment);
    addComment(text,newComment);
  }
};


if (form) {
  form.addEventListener("submit", handleSubmit);
}