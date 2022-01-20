import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CustomLink from "src/components/customComp/CustomLink";
import { ERouterPath } from "src/types/route";
import { RootState, useAppSelector } from "src/stores/rootReducer";
import { toggleTheme } from "src/utils/theme/ThemeSlice";
// import productApi from "src/api/productApi";
// import TopNavCart from "src/components/TopNavCart";
// import TopNavSearch from "src/components/TopNavSearchList";
// import { AuthContext } from "src/contexts/AuthContext";
// import { CartContext } from "src/contexts/CartContextProvider";
// import { ThemeContext } from "src/contexts/ThemeContext";
// import { TOGGLE_THEME } from "src/reducers/types";
// import LoginForm from "src/partials/LoginForm";
// import SignUpForm from "src/partials/SignUpForm";
// import TopNavRps from "src/partials/TopNavRps";
import "./TopNav.scss";

const TopNav = () => {
  // theme context

  const { style, isLightTheme } = useAppSelector(
    (state: RootState) => state.theme
  );

  // const {
  //   currentUser,
  //   handleLogout,
  //   loginFormOpen,
  //   signUpFormOpen,

  //   setLoginFormOpen,
  // } = useContext(AuthContext);

  //cart context
  // const { totalInCart } = useContext(CartContext);
  const dispatch = useDispatch();

  // const [category, setCategory] = useState([]);
  // useEffect(() => {
  //   const fetchCategoryApi = async () => {
  //     try {
  //       const res = await productApi.getCategoryList();
  //       setCategory(res.data);
  //     } catch (error) {}
  //   };

  //   fetchCategoryApi();
  // }, []);

  const handleToggleThemeClick = () => {
    dispatch(toggleTheme());
  };

  // function handleLoginClick() {
  //   setLoginFormOpen(true);
  //   const userCheckbox = document.querySelector("#user-checkbox");
  //   if (userCheckbox.checked) {
  //     userCheckbox.checked = false;
  //   }
  // }

  // function handleLogoutClick() {
  //   const logoutConfirmBox = document.querySelector(".confirm-logout");
  //   if (logoutConfirmBox) {
  //     logoutConfirmBox.classList.add("active");
  //   }
  //   const userCheckbox = document.querySelector("#user-checkbox");
  //   if (userCheckbox.checked) {
  //     userCheckbox.checked = false;
  //   }

  //   const topNavOverlayEle = document.querySelector(".nav-overlay");
  //   if (topNavOverlayEle) {
  //     topNavOverlayEle.classList.add("active");
  //   }
  // }

  // function handleLogOutCancel() {
  //   const logoutConfirmBox = document.querySelector(".confirm-logout");
  //   if (logoutConfirmBox) {
  //     logoutConfirmBox.classList.remove("active");
  //   }

  //   const topNavOverlayEle = document.querySelector(".nav-overlay");
  //   if (topNavOverlayEle) {
  //     topNavOverlayEle.classList.remove("active");
  //   }
  // }

  // function handleLogOutConfirm() {
  //   handleLogout();
  //   const logoutConfirmBox = document.querySelector(".confirm-logout");
  //   if (logoutConfirmBox) {
  //     logoutConfirmBox.classList.remove("active");
  //   }

  //   const topNavOverlayEle = document.querySelector(".nav-overlay");
  //   if (topNavOverlayEle) {
  //     topNavOverlayEle.classList.remove("active");
  //   }
  // }

  // function handleOverlayClick() {
  //   const topNavRpsEle = document.querySelector(".top-nav-rps");
  //   if (topNavRpsEle) {
  //     topNavRpsEle.classList.toggle("active");
  //   }
  // }

  return (
    <div className="top-nav" style={{ backgroundColor: style.backgroundColor }}>
      <Container>
        {/* <TopNavRps
          category={category}
          currentUser={currentUser}
          handleLoginClick={handleLoginClick}
          handleLogoutClick={handleLogoutClick}
        /> */}

        <div className="top-nav__branch">
          <CustomLink to={ERouterPath.HOME}>
            <img src="./img/logofull2.png" alt="" />
          </CustomLink>
        </div>

        <ul className="top-nav__list d-none d-lg-flex">
          <li className="top-nav-item">
            <CustomLink to={ERouterPath.HOME}>Home</CustomLink>
          </li>

          <li className="top-nav-item">
            <CustomLink to={ERouterPath.PRODUCT_LIST}>
              <span>Sản phẩm</span>
              <i className="bi bi-chevron-down"></i>
            </CustomLink>

            <ul
              className="top-nav-product-list"
              style={{ backgroundColor: style.backgroundColor }}
            >
              {/* {category.map((cateItem) => (
                <li key={cateItem.id} className="top-nav-product-item">
                  <CustomLink to={`/products-list-${cateItem.id}`}>
                    {cateItem.category_name}
                  </CustomLink>
                </li>
              ))} */}
              <li className="top-nav-product-item">
                <CustomLink
                  style={{ background: style.primaryColor, color: "#fff" }}
                  to={ERouterPath.PRODUCT_LIST}
                >
                  Tất cả
                </CustomLink>
              </li>
            </ul>
          </li>

          <li className="top-nav-item">
            <CustomLink to={ERouterPath.ACCOUNT}>Tài khoản</CustomLink>
          </li>

          <li className="top-nav-item">
            <CustomLink to={ERouterPath.CART}>Cart</CustomLink>
          </li>
        </ul>

        <div className="top-nav__user-wrap">
          <div
            className="top-nav__theme top-nav-item d-none d-lg-flex"
            onClick={() => handleToggleThemeClick()}
          >
            {isLightTheme ? (
              <i className="bi bi-moon"></i>
            ) : (
              <i className="bi bi-brightness-high-fill"></i>
            )}
          </div>

          {/* {currentUser && currentUser.token ? (
            <div className="top-nav__user d-none d-lg-flex ">
              <input type="checkbox" name="" id="user-checkbox" hidden />
              <label htmlFor="user-checkbox" className="nav-overlay "></label>
              <label htmlFor="user-checkbox" className="top-nav__user-label">
                <i className="bi bi-person-check"></i>
                <i className="bi bi-x-lg"></i>
              </label>
              <div
                className="user-wrap"
                style={{
                  boxShadow: `0px 0px 10px ${style.boxShadowColor}`, 
                }}
              >
                <div
                  className="user-btn-list" 
                >
                 
                  <button
                    className="user-item"
                    onClick={() => handleLogoutClick()}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : ( */}
          <div className="top-nav-item top-nav__user d-none d-lg-flex ">
            <input type="checkbox" name="" id="user-checkbox" hidden />
            <label htmlFor="user-checkbox" className="nav-overlay "></label>
            <label htmlFor="user-checkbox" className="top-nav__user-label">
              <i className="bi bi-person"></i>
              <i className="bi bi-x-lg"></i>
            </label>
            <div
              className="user-wrap"
              style={{
                boxShadow: `0px 0px 10px ${style.boxShadowColor}`,
                backgroundColor: style.backgroundColor,
              }}
            >
              <div className="user-btn-list">
                <button
                  className="user-item"
                // onClick={() => handleLoginClick()}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>

          <div className="top-nav__cart top-nav-item">
            <input
              type="checkbox"
              name="top-nav-cart-checkbox"
              id="top-nav-cart-checkbox"
              hidden
            />
            <label
              htmlFor="top-nav-cart-checkbox"
              className="top-nav__cart-icon"
            >
              <div className="top-nav-cart-icon">
                <i className="bi bi-cart3"></i>
                <span style={{ border: `2px solid ${style.backgroundColor}` }}>
                  {/* {totalInCart().totalProduct} */}
                </span>
              </div>
              <i className="bi bi-x-lg"></i>
            </label>

            {/* <TopNavCart /> */}
          </div>
        </div>
      </Container>
      {/* <div className="nav-overlay" onClick={() => handleOverlayClick()}></div> */}

      {/* {loginFormOpen ? <LoginForm /> : ""}
      {signUpFormOpen ? <SignUpForm /> : ""} */}

      <div className="confirm-logout">
        <span>Are you sure you want to log out?</span>
        <div className="confirm-logout-wrap">
          <div
            className=""
          // onClick={() => handleLogOutCancel()}
          >
            Cancel
          </div>
          <div
            className=""
          // onClick={() => handleLogOutConfirm()}
          >
            Log out
          </div>
        </div>
      </div>
      {/* end of log out  */}
    </div>
  );
};

export default TopNav;
