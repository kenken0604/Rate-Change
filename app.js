const money1 = document.getElementById('money-one')
const money2 = document.getElementById('money-two')
const input1 = document.getElementById('amount-one')
const input2 = document.getElementById('amount-two')

const rate = document.getElementById('rate')
const swap = document.getElementById('swap')

//每個動作都重新計算值
money1.addEventListener('change', count)
money2.addEventListener('change', count)
input1.addEventListener('input', count)
input2.addEventListener('input', count)

//計算的程式
function count() {
  const m1 = money1.value //得到貨幣名稱(html要設定value值)
  const m2 = money2.value

  fetch(`https://open.er-api.com/v6/latest/${m1}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      let currentRate = data.rates[m2] //中括號尋找指定目標

      rate.innerText = `1 ${m1} = ${currentRate} ${m2}`
      input2.value = (input1.value * currentRate).toFixed(4)
    })
}

count()

//交換貨幣事件
swap.addEventListener('click', () => {
  const temp = money1.value //互換賦值的技巧
  money1.value = money2.value
  money2.value = temp
  count()
})
