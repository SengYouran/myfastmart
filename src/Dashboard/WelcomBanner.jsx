function WelcomBanner({ rotateIn, currentIndex, bannerImage }) {
  return (
    <>
      <div className="txtWelcome">
        <h2 className="txt">សូមរីករាយជាមួយទំនិញនៅ Fast Mart!</h2>
        <h3 className="txtDetail">
          នៅ Mini Mart យើងផ្តល់ជូននូវផលិតផលគុណភាពប្រចាំថ្ងៃជាច្រើន
          ប្រកបដោយតម្លៃសមរម្យ និងងាយស្រួលក្នុងការជ្រើសរើស ទាំងស្រុងនៅទីតាំងមួយ។
          រីករាយជាមួយបទពិសោធន៍ការជាវទំនិញដ៏រលូន មានសេវាកម្មរហ័ស សម្អាត
          និងផលិតផលថ្មីៗជានិច្ច បន្ថែមជាមួយជម្រើសល្អ
          និងការផ្ដល់ជូនពិសេសដែលអ្នកមិនអាចរំលងបាន!
        </h3>
        <h3 className="txtDetail">
          🛒 ជម្រើសជាច្រើន – តម្លៃសមរម្យ – ទំនិញតែងតែស្រស់ថ្មី!
        </h3>
      </div>
      <div className="image ">
        <img
          key={currentIndex}
          src={bannerImage[currentIndex]}
          alt={`Food ${currentIndex + 1}`}
          className={`img ${rotateIn ? "active" : ""}`}
        />
      </div>
    </>
  );
}

export default WelcomBanner;
