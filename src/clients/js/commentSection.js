const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteComment = document.querySelectorAll(".delete__comment");
const videoLike=document.getElementById("videoLike");
const subChannel=document.getElementById("videoSubscribe");


const addComment = (text, id,owner) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const userAvatar=document.createElement("img");
  userAvatar.width="40";
  userAvatar.height="40";
  userAvatar.src = owner;
  const userName = document.createElement("span");
  userName.innerText = ` @${owner}`;
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteComment = document.createElement("button");
  deleteComment.className="delete__comment";
  deleteComment.innerText = "삭제";
  deleteComment.addEventListener("click",handleDelete);
  videoLike.addEventListener("click",handleLike);
  subChannel.addEventListener("click",handelSubscribe);
  newComment.appendChild(userAvatar);
  newComment.appendChild(userName);
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
    cache: "no-cache",
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId ,owner} = await response.json();
    addComment(text, newCommentId,owner);
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

const likeCounting = (likeCount) => {
  const countNumber = videoLike.querySelector("span");
  if (videoLike.classList.contains("clicked")) {
    videoLike.classList.remove("clicked");
  }
  countNumber.innerText = `좋아요 ${likeCount}`;
};

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

const subChecking=(check)=>{
  const countNumber=subChannel.querySelector("span");
  if(check){
    countNumber.innerText=`구독 중`;
  }
}

const handelSubscribe=async()=>{
  const videoId=videoContainer.dataset.id;
  const response=await fetch(`/api/video/${videoId}/subscribe`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
  });
  if(response.status=201){
    const {check}=await response.json();
    subChecking(check);
  }
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteComment.forEach((dComment) => dComment.addEventListener("click", handleDelete));

videoLike.addEventListener("click",handleLike);

subChannel.addEventListener("click",handelSubscribe);