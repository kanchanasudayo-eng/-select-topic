// 1. ดึง Element สำหรับกรอกข้อมูลหลัก
const totalBillInput = document.getElementById('totalBill');
const numPeopleInput = document.getElementById('numPeople');
const serviceChargeInput = document.getElementById('serviceCharge');
const calculateBtn = document.getElementById('calculateBtn');

// ดึง Element สำหรับปุ่มเพิ่ม/ลดค่า (+ / -)
const btnBillPlus = document.getElementById('btn-bill-plus');
const btnBillMinus = document.getElementById('btn-bill-minus');
const btnPeoplePlus = document.getElementById('btn-people-plus');
const btnPeopleMinus = document.getElementById('btn-people-minus');
const btnServicePlus = document.getElementById('btn-service-plus');
const btnServiceMinus = document.getElementById('btn-service-minus');

// ดึง Element สำหรับพื้นที่แสดงผล
const resultArea = document.getElementById('resultArea');
const totalWithServiceText = document.getElementById('totalWithServiceText');
const perPersonText = document.getElementById('perPersonText');

// 2. ฟังก์ชันเสริมสำหรับการบวกและลดตัวเลขในช่องกรอก (Step Helper)
function changeInputValue(inputElement, step, isAddition, minValue = 0) {
    let currentValue = Number(inputElement.value) || 0;
    if (isAddition) {
        currentValue += step;
    } else {
        currentValue -= step;
        if (currentValue < minValue) {
            currentValue = minValue; // จำกัดค่าขั้นต่ำเพื่อไม่ให้ผู้ใช้ได้ค่าติดลบ
        }
    }
    inputElement.value = currentValue;
    
    // ซ่อนพื้นที่แสดงผลลัพธ์เก่า เพื่อให้คำนวณใหม่
    resultArea.classList.add('hidden');
}

// 3. ผูกคำสั่งของปุ่มบวกและลบ (+ / -) ด้วย addEventListener (ตามข้อกำหนดกติกาของวิชา)
btnBillPlus.addEventListener('click', () => changeInputValue(totalBillInput, 10, true));
btnBillMinus.addEventListener('click', () => changeInputValue(totalBillInput, 10, false));

btnPeoplePlus.addEventListener('click', () => changeInputValue(numPeopleInput, 1, true, 1));
btnPeopleMinus.addEventListener('click', () => changeInputValue(numPeopleInput, 1, false, 1));

btnServicePlus.addEventListener('click', () => changeInputValue(serviceChargeInput, 1, true));
btnServiceMinus.addEventListener('click', () => changeInputValue(serviceChargeInput, 1, false));

// 4. ฟังก์ชันหลักสำหรับการคำนวณบิล
function calculateSplit() {
    const totalBill = Number(totalBillInput.value);
    const numPeople = Number(numPeopleInput.value);
    const serviceCharge = Number(serviceChargeInput.value) || 0;

    // ระบบตรวจสอบความถูกต้อง (Validation)
    if (totalBill <= 0) {
        alert('❌ กรุณากรอกยอดเงินรวมที่ถูกต้อง (มากกว่า 0 บาท)');
        return;
    }
    if (numPeople <= 0) {
        alert('❌ กรุณาระบุจำนวนคนตั้งแต่ 1 คนขึ้นไป');
        return;
    }
    if (serviceCharge < 0 || serviceCharge > 100) {
        alert('❌ เปอร์เซ็นต์ Service Charge จะต้องอยู่ระหว่าง 0 ถึง 100%');
        return;
    }

    // ประมวลผลทางคณิตศาสตร์
    const serviceAmount = (totalBill * serviceCharge) / 100;
    const grandTotal = totalBill + serviceAmount;
    const splitPerPerson = grandTotal / numPeople;

    // บันทึกและแสดงผลโดยใช้ Template Literal (ตามข้อกำหนดกติกาข้อ 5 ของโปรเจกต์)
    totalWithServiceText.textContent = `ยอดรวมทั้งหมด: ${grandTotal.toFixed(2)} บาท`;
    perPersonText.textContent = `แต่ละคนจ่าย: ${splitPerPerson.toFixed(2)} บาท`;

    // เปิดแสดงผลลัพธ์
    resultArea.classList.remove('hidden');
}

// ผูกฟังก์ชันเข้ากับปุ่มคำนวณหลักด้วย addEventListener
calculateBtn.addEventListener('click', calculateSplit);

// ซ่อนผลลัพธ์ทันทีที่มีการแก้ตัวเลขในช่อง input ใดๆ เพื่อความสวยงาม
[totalBillInput, numPeopleInput, serviceChargeInput].forEach(input => {
    input.addEventListener('input', () => {
        resultArea.classList.add('hidden');
    });
});