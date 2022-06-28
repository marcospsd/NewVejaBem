import React from 'react'


export const DataMes = (id) => {
        const news = new Date(id);
        const now = new Date()
        const mesto = news.getMonth()
        const mes = () => {
            switch (mesto) {
                case 1:
                    return "Janeiro"
                case 2:
                    return 'Fevereiro'
                case 3: 
                    return 'Março'
                case 4:
                    return 'Abril'
                case 5:
                    return 'Maio'
                case 6:
                    return 'Junho'
                case 7:
                    return 'Julho'
                case 8:
                    return 'Agosto'
                case 9:
                    return 'Setembro'
                case 10:
                    return 'Outubro'
                case 11:
                    return 'Novembro'
                case 12:
                    return 'Dezembro'

            }
        }
        const diff = (now.getDate() - news.getDate())
        switch (true) {
            case diff === 0:
                return "Hoje"
            case diff === 1:
                return "Ontem"
            case diff <= 2:
                return "Essa semana"
            case diff >= 7:
                return news.getDay() + " de " + mes(news)
        }       




}

