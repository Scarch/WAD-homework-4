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

    methods: {

    },
    watch: {

    },
};
</script>

<style scoped>
#footer {
    margin-top: auto;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}

footer {
    margin-top: auto;
    width: 100%;
    padding: 30px;
    text-align: center;
    background-color: rgba(238, 238, 238, 0.722);
    border-radius: 8px;
    padding: 10px;
    line-height: 1.5;
}
</style>