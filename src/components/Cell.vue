<template>
    <div :style="selfStyle" @click="onCellClick" class="cell-num-wrapper">
        <span class="num-p">{{ num }}</span>
    </div>
</template>

<script>
export default {
    name: 'cell',
    data() {
        return {
            selfStyle: {
                'color': 'black',
                'background-color': '#ffe0b2'
            },
            clicked: false
        }
    },
    props: {
        num: {
            required: true
        },
        expected: {
            required: true
        },
        resetFlag: {
            required: true
        }
    },
    watch: {
        resetFlag: {
            // eslint-disable-next-line
            handler: function(val, oldVal) {
                // reset style
                this.selfStyle['color'] = 'black'
                this.selfStyle['background-color'] = '#ffe0b2'
                // enable click
                this.clicked = false
            }
        }
    },
    methods: {
        onCellClick() {
            if (this.clicked) {
                // make sure the cell only click for 1 times in one game
                // do nothing if click again on same cell
                return
            }
            this.clicked = true
            if (this.num === this.expected) {
                // correct
                this.selfStyle['color'] = 'white'
                this.selfStyle['background-color'] = '#00897b'
                this.$emit('correct')
            } else {
                // wrong
                this.selfStyle['color'] = 'white'
                this.selfStyle['background-color'] = '#ec407a'
                this.$emit('wrong', {num: this.num, expected: this.expected})
            }
        }
    },
    mounted() {
        // reset style
        this.selfStyle['color'] = 'black'
        this.selfStyle['background-color'] = '#ffe0b2'
    }
}
</script>

<style>
.cell-num-wrapper {
    height: 100%;
    width: 100%;
}
.cell-num-wrapper>span {
    display: inline-block;
    padding-top: 45%;
    font-size: xxx-large;
}
</style>
