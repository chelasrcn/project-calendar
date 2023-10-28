(function() {

    'use strict'

    // ELEMENTOS HTML
    let selectMonth = document.getElementById('months')
    let selectYear  = document.getElementById('years')
    let divDays     = document.getElementById('days')

    // OUTRAS VARIÁVEIS
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let years  = [1980, 2023]

    document.addEventListener('DOMContentLoaded', () => {

        createMonths()
        createYears()
        
        const { currentFullYear, currentMonth } = getCurrentDate()

        selectMonth.value = currentMonth
        selectYear.value  = currentFullYear

        try {
            createCalendar(currentFullYear, currentMonth)
        } catch (error) {
            alert(error.message)
        }

    })

    selectMonth.addEventListener('change', () => {
        try {
            createCalendar(parseInt(selectYear.value), parseInt(selectMonth.value))
        } catch (error) {
            alert(error.message)
        }
    })

    selectYear.addEventListener('change', () => {
        try {
            createCalendar(parseInt(selectYear.value), parseInt(selectMonth.value))
        } catch (error) {
            alert(error.message)
        }
    })

    function createMonths() {

        for(let month in months) {

            let objMonth = {
                'value': month,
                'text' : months[month]
            }

            let option = createOption(objMonth)
            selectMonth.appendChild(option)  

        }

    }

    function createYears() {

        const [minYear, maxYear] = years

        for(let year = minYear; year <= maxYear; year++) {

            let objYear = {
                'value' : year,
                'text'  : year
            }

            let option = createOption(objYear)
            selectYear.appendChild(option)

        }

    }

    function createOption({ value, text }) {
        let option = document.createElement('option')
        option.value = value
        option.textContent = text
        return option
    }

    function createCalendar(year, month) {

        validateYear(year)

        validateMonth(month)

        divDays.innerHTML = ''

        const { divStart, lastDay, divEnd } = generateCalendar(month, year)

        // ADICIONA DIVS NO INÍCIO (SE NECESSÁRIO)
        if (divStart > 0) {
            for (let i = 1; i <= divStart; i++) {
                let div = createDiv()
                divDays.appendChild(div)
            }
        }

        const { currentFullYear, currentMonth, currentDay } = getCurrentDate()

        // ADICIONA DIVS QUE CONTÉM OS DIAS DO CALENDÁRIO
        for (let day = 1; day <= lastDay; day++) {

            let isCurrentDay = (currentFullYear === year && currentMonth === month && currentDay === day) ? true : false
            
            let div = createDiv(day, isCurrentDay)
            divDays.appendChild(div)

        }

        // ADICIONA DIVS NO FINAL (SE NECESSÁRIO)
        if (divEnd > 0) {
            for (let i = 1; i <= divEnd; i++) {
                let div = createDiv()
                divDays.appendChild(div)
            }
        }

    }

    function validateMonth(month) {

        const isValidMonth = typeof month === 'number' && Object.keys(months).some(key => parseInt(key) === month)

        if (!isValidMonth)
            throw new Error ('Mês inválido!')

    }

    function validateYear(year) {

        const [minYear, maxYear] = years

        const isValidYear = (typeof year === 'number' && year >= minYear && maxYear >= year) ? true : false

        if (!isValidYear)
            throw new Error ('Ano inválido!')

    }

    function generateCalendar(month, year) {

        const firstDate = new Date(year, month, 1)

        const lastDate  = new Date(year, month + 1, 0)

        /*
        ** divStart = QUANTIDADE DE DIVS QUE SERÁ ADICIONADA NO INÍCIO DO CALENDÁRIO, SE NECESSÁRIO
        **
        ** getDay()
        ** retorna o dia da semana, onde:
        **
        ** 0 - domingo
        ** 1 - segunda-feira
        ** 2 - terça-feira
        ** 3 - quarta-feira
        ** 4 - quinta-feira
        ** 5 - sexta-feira
        ** 6 - sábado
        **/
        const divStart  = firstDate.getDay()

        // ÚLTIMO DIA DO MÊS / QUANTIDADE DE DIAS
        const lastDay   = lastDate.getDate()

        const totalDivStartLastDay  = divStart + lastDay

        /*
        ** divEnd = QUANTIDADE DE DIVS QUE SERÁ ADICIONADA NO FINAL DO CALENDÁRIO, SE NECESSÁRIO
        **
        ** SIGNIFICADO DOS NÚMEROS MÁGICOS:
        **
        ** 42 = 7 colunas x 6 linhas
        ** 35 = 7 colunas x 5 linhas
        **
        ** EXEMPLO 1: SE totalDivStartLastDay FOR MAIOR QUE 35, SIGNFICA QUE O CALENDÁRIO PASSOU DE 5 (CINCO) LINHAS, 
        ** LOGO ADICIONAREMOS A QUANTIDADE DE DIVS NECESSÁRIA PARA COMPLETAR O TOTAL DE 42 (QUARENTA E DUAS) DIVS
        */
        const divEnd    = totalDivStartLastDay > 35 ? 42 - totalDivStartLastDay : 35 - totalDivStartLastDay

        return {
            'divStart': divStart,
            'lastDay' : lastDay,
            'divEnd'  : divEnd
        }

    }

    function createDiv(text = '', isCurrentDay = false) {

        let div = document.createElement('div')
        
        if (text) {
            div.classList.add('day')
            div.textContent = text
        }
            
        if (isCurrentDay)
            div.classList.add('today')

        return div

    }

    function getCurrentDate() {

        let currentDate     = new Date()

        let currentMonth    = currentDate.getMonth()
        let currentFullYear = currentDate.getFullYear()
        let currentDay      = currentDate.getDate()

        return {
            'currentFullYear': currentFullYear,
            'currentMonth'   : currentMonth,
            'currentDay'     : currentDay
        }

    }

})()