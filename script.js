// 1. ดึง Element สำหรับกรอกข้อมูลหลัก
const totalBillInput = document.getElementById('totalBill');
const numPeopleInput = document.getElementById('numPeople');
const serviceChargeInput = document.getElementById('serviceCharge');
const calculateBtn = document.getElementById('calculateBtn');

// ดึง Element ปุ่มบวกและลบ (+ / -)
const btnBillPlus = document.getElementById('btn-bill-plus');
const btnBillMinus = document.getElementById('btn-bill-minus');
const btnPeoplePlus = document.getElementById('btn-people-plus');
const btnPeopleMinus = document.getElementById('btn-people-minus');
const btnServicePlus = document.getElementById('btn-service-plus');
const btnServiceMinus = document.getElementById('btn-service-minus');

// ดึง Element สำหรับแสดงผลลัพธ์ลงจอ
const resultArea = document.getElementById('resultArea');
const totalWithServiceText = document.getElementById('totalWithServiceText');
const perPersonText = document.getElementById('perPersonText');

// 2. ฟังก์ชันช่วยปรับค่าตัวเลขเมื่อกดปุ่มบวกลบ (Step Helper)
function changeInputValue(inputElement, step, isAddition, minValue = 0) {
    let currentValue = Number(inputElement.value) || 0;
    if (isAddition) {
        currentValue += step;
    } else {
        currentValue -= step;
        if (currentValue < minValue) {
            currentValue = minValue; // ควบคุมค่าต่ำสุดเพื่อไม่ให้บิลติดลบ
        }
    }
    inputElement.value = currentValue;
    
    // ซ่อนพื้นที่แสดงผลเก่า เพื่อบังคับให้ผู้ใช้กดปุ่มคำนวณใหม่
    resultArea.classList.add('hidden');
}

// 3. ผูกคำสั่งปุ่มบวกลบด้วย addEventListener (ห้ามเขียน onclick ใน HTML)
btnBillPlus.addEventListener('click', () => changeInputValue(totalBillInput, 50, true));
btnBillMinus.addEventListener('click', () => changeInputValue(totalBillInput, 50, false));

btnPeoplePlus.addEventListener('click', () => changeInputValue(numPeopleInput, 1, true, 1));
btnPeopleMinus.addEventListener('click', () => changeInputValue(numPeopleInput, 1, false, 1));

btnServicePlus.addEventListener('click', () => changeInputValue(serviceChargeInput, 1, true));
btnServiceMinus.addEventListener('click', () => changeInputValue(serviceChargeInput, 1, false));

// 4. ฟังก์ชันหลักสำหรับคำนวณบิลค่าข้าว
function calculateSplit() {
    const totalBill = Number(totalBillInput.value);
    const numPeople = Number(numPeopleInput.value);
    const serviceCharge = Number(serviceChargeInput.value) || 0;

    // การตรวจสอบเงื่อนไขความถูกต้อง (Data Validation) เพื่อคะแนนสอบปากเปล่า
    if (totalBill <= 0) {
        alert('❌ รบกวนกรอกยอดเงินค่าข้าวให้ถูกต้องน้า (ต้องมากกว่า 0 บาท)');
        return;
    }
    if (numPeople <= 0) {
        alert('❌ รบกวนระบุจำนวนคนอย่างน้อย 1 คนขึ้นไปจ้า');
        return;
    }
    if (serviceCharge < 0 || serviceCharge > 100) {
        alert('❌ เปอร์เซ็นต์ Service Charge ต้องอยู่ระหว่าง 0 ถึง 100% เท่านั้นครับ');
        return;
    }

    // คำนวณตามสูตรคณิตศาสตร์
    const serviceAmount = (totalBill * serviceCharge) / 100;
    const grandTotal = totalBill + serviceAmount;
    const splitPerPerson = grandTotal / numPeople;

    // นำผลลัพธ์ที่คำนวณได้ไปจัดรูปแบบและแสดงผลโดยใช้ Template Literal (ตามข้อกำหนดกติกาข้อ 5)
    totalWithServiceText.textContent = `ยอดรวมสุทธิ: ${grandTotal.toFixed(2)} บาท`;
    perPersonText.textContent = `จ่ายคนละ: ${splitPerPerson.toFixed(2)} บาท`;

    // เปิดการแสดงผลลัพธ์
    resultArea.classList.remove('hidden');
}

// ผูกฟังก์ชันเข้ากับปุ่มคำนวณหลักด้วย addEventListener
calculateBtn.addEventListener('click', calculateSplit);

// ตัวช่วยเสริม: ซ่อนหน้าต่างผลลัพธ์ทันทีเมื่อผู้ใช้เปลี่ยนข้อมูลในอินพุตด้วยคีย์บอร์ด
[totalBillInput, numPeopleInput, serviceChargeInput].forEach(input => {
    input.addEventListener('input', () => {
        resultArea.classList.add('hidden');
    });
});