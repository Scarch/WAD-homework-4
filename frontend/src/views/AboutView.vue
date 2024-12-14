<template>
  <div class="about">
    <h2>About us</h2>
    <p>We are three CS students from Estonia.</p>
    <p>You can contact us by coming to Tartu, Estonia.</p>
    <p>Happy Holidays from our team to yours!</p>
    <img src="@/assets/the office.jpg" alt="The Office christmas photo"> 
  </div>
</template>

<style scoped>
img {
  margin: 3%;
}

/* Smaller screen compatibility */
@media (max-width: 550px) {
  .about {
    width: 100%;
  }
  img {
    width: 90%;
  }

}
</style>
