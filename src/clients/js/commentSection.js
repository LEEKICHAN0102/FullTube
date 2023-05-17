const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteComment = document.querySelectorAll(".delete__comment");
const videoLike=document.getElementById("videoLike");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteComment = document.createElement("span");
  deleteComment.className="delete__comment";
  deleteComment.innerText = "❌";
  deleteComment.addEventListener("click",handleDelete);
  videoLike.addEventListener("click",handleLike);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteComment);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/video/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete=async(event)=>{
  const dComment=event.target.parentElement;
  const commentId=dComment.dataset.id;
  // console.log(dComment);
  // console.log(commentId);
  const response=await fetch(`/api/video/${commentId}/delete`,{
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({commentId}),
  });
  if(response.status===200){
    dComment.remove();
  }
};

const likeCounting=(likeCount)=>{
  const countNumber=videoLike.querySelector("span");
  countNumber.innerText=`좋아요 ${video.meta.rating.length}`;
}

const handleLike=async()=>{
  const videoId=videoContainer.dataset.id;
  const response=await fetch(`/api/video/${videoId}/like`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
});
  if(response.status=201){
    const {likeCount}=await response.json();
    likeCounting(likeCount);
  }
}


if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteComment.forEach((dComment) => dComment.addEventListener("click", handleDelete));

videoLike.addEventListener("click",handleLike);