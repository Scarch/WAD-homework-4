<template>
    <div id="footer">
        <footer>
            <p>
                <strong>Team AV: </strong><br>
                Sten-Egert, Gerda, Beatrice
            </p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    created() {
        window.addEventListener("resize", this.changeFooterPosition);
    },
    destroyed() {
        window.removeEventListener("resize", this.changeFooterPosition);
    },
    methods: {
        changeFooterPosition(e) { // Makes it so that the footer appears at the bottom of the page in the signup view
            if (window.innerHeight < 575) {
                document.getElementById("footer").style.setProperty("position", "")
            } else {
                document.getElementById("footer").style.setProperty("position", "fixed")
            }    
        }
    },
    watch: {
        $route(to, from) {
            console.log(to.name)
            if (window.innerHeight > 575) {
                document.getElementById("footer").style.setProperty("position", "fixed")
            }
        },
    },
};
</script>

<style scoped>
#footer {
    height: 120px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

footer {
    width: 100%;
    text-align: center;
    background-color: rgba(238, 238, 238, 0.722);
    border-radius: 8px;
    padding: 10px;
    line-height: 1.5;
}
</style>