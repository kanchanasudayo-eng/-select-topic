const totalInput = document.getElementById("total");
const peopleInput = document.getElementById("people");
const serviceInput = document.getElementById("service");
const result = document.getElementById("result");
const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", function () {

    const total = Number(totalInput.value);
    const people = Number(peopleInput.value);
    const service = Number(serviceInput.value);

    if (total <= 0 || people <= 0 || service < 0) {
        result.innerHTML = "กรุณากรอกข้อมูลให้ถูกต้อง";
        return;
    }

    const serviceAmount = total * service / 100;
    const finalPrice = total + serviceAmount;
    const eachPerson = finalPrice / people;

    result.innerHTML = `
        ยอดรวมทั้งหมด: ${finalPrice.toFixed(2)} บาท <br>
        แต่ละคนจ่าย: ${eachPerson.toFixed(2)} บาท
    `;
});