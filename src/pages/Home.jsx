import Navbar from "../Components/Navbar";
import MonkeyBookTrans from "../Components/MonkeyBookOverlay";
import AddNewTrans from "../Components/AddNewTrans";
import Footer from "../Components/Footer";
import QuickView from "../Components/QuickView";
import CompanyDepartmentTrans from "../Components/CompanyDepartmentTrans";


function Home() {
  return (
    <>
      <Navbar />
      <main className="container">


          <section id="QuickView">
          <QuickView />
          </section>

          

          {/* <section id="CompanyDepartmentTrans">
          <CompanyDepartmentTrans />
          </section> */}


       
        
            <MonkeyBookTrans />


      </main>
      
       <Footer />
    </>
  );
}

export default Home;