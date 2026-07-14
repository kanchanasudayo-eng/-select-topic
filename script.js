// ดึงข้อมูล Element ที่ต้องการใช้งาน
const totalBillInput = document.getElementById('totalBill');
const numPeopleInput = document.getElementById('numPeople');
const serviceChargeInput = document.getElementById('serviceCharge');
const calculateBtn = document.getElementById('calculateBtn');
const resultArea = document.getElementById('resultArea');
const totalWithServiceSpan = document.getElementById('totalWithService');
const perPersonSpan = document.getElementById('perPerson');

// ฟังก์ชันสำหรับคำนวณ
function calculateBillSplit() {
    // 1. ดึงค่าจาก input และแปลงเป็นตัวเลข
    const totalBill = Number(totalBillInput.value);
    const numPeople = Number(numPeopleInput.value);
    const serviceCharge = Number(serviceChargeInput.value);

    // 2. ตรวจสอบข้อมูลนำเข้าเบื้องต้น
    // จำนวนคนต้องไม่เป็น 0, ค่าบิลและจำนวนคนต้องเป็นค่าบวก, service charge ต้องไม่เกิน 100
    if (isNaN(totalBill) || totalBill < 0 ||
        isNaN(numPeople) || numPeople <= 0 ||
        isNaN(serviceCharge) || serviceCharge < 0 || serviceCharge > 100) {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง:\n- ยอดรวมไม่สามารถเป็นค่าลบ\n- จำนวนคนต้องเป็นค่าบวกมากกว่า 0\n- Service Charge ต้องอยู่ระหว่าง 0 ถึง 100");
        return; // ออกจากฟังก์ชันทันทีหากข้อมูลไม่ถูกต้อง
    }

    // 3. เริ่มการคำนวณ
    // คำนวณค่า Service Charge ที่เป็นบาท
    const serviceChargeAmount = (totalBill * serviceCharge) / 100;
    // คำนวณยอดรวมทั้งหมด (บิล + Service Charge)
    const finalTotalBill = totalBill + serviceChargeAmount;
    // คำนวณยอดที่แต่ละคนต้องจ่าย
    const amountPerPerson = finalTotalBill / numPeople;

    // 4. แสดงผลลัพธ์
    // แปลงตัวเลขเป็นทศนิยม 2 ตำแหน่ง
    totalWithServiceSpan.textContent = finalTotalBill.toFixed(2);
    perPersonSpan.textContent = amountPerPerson.toFixed(2);

    // แสดงพื้นที่ผลลัพธ์
    resultArea.classList.remove('hidden');
}

// ผูกฟังก์ชันเข้ากับเหตุการณ์คลิกปุ่ม
calculateBtn.addEventListener('click', calculateBillSplit);

// ตัวช่วยเสริม: ซ่อนผลลัพธ์ทันทีที่มีการเปลี่ยนแปลงข้อมูลในช่อง input
[totalBillInput, numPeopleInput, serviceChargeInput].forEach(input => {
    input.addEventListener('input', () => {
        resultArea.classList.add('hidden');
    });
});