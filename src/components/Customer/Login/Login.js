import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    mobile_number: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setLoading(true);
    try {
      // Login API call
      const loginResponse = await fetch('https://prasad-gz5p.onrender.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
 
      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed');
      }
 
      const { token } = await loginResponse.json();
      localStorage.setItem('authToken', token);
      console.log(token)
      // Check for specific mobile number and password for Admin
      if (formData.mobile_number === '9848098480' && formData.password === 'shiva') {
        setError(null);
        onLoginSuccess('admin'); // Pass role as 'admin'
        navigate('/Admin-Home');
      } else {
        // Now trigger the /home/ API call to check for customer redirection
        const homeResponse = await fetch('https://prasad-gz5p.onrender.com/api/home/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
 
        if (!homeResponse.ok) {
          throw new Error('Failed to verify home redirection.');
        }
 
        const homeData = await homeResponse.json();
 
        // Check if redirect is "supplier_customer_home"
        if (homeData.redirect === 'supplier_customer_home') {
          setError(null);
          onLoginSuccess('customer'); // Pass role as 'customer'
          navigate('/customer-home');
        }else if(homeData.redirect === 'customer_home'){
          setError(null);
          onLoginSuccess('BasicCustomer'); // Pass role as 'customer'
          navigate('/bbrands');
        } else {
          throw new Error('Invalid redirection.');
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mainContainer010'>
      <div className="login-page010">
        <div className="container010">
          <h1 className="heading010">Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit} className="form010">
            <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              className="input010"
            />
            <div className="password-container010">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input010"
              />
              <span
                className="password-toggle010"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}  className='eye'/>
              </span>
            </div>
            <button type="submit" className="login-button010" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <p>
            Don't have an account?
            <button
              onClick={() => navigate('/register')}
              className="register-button010"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import './Login.css';
 
// const Login = ({ onLoginSuccess }) => {
//   const [formData, setFormData] = useState({
//     mobile_number: '',
//     password: '',
//   });
 
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     setLoading(true);
//     try {
//       // Login API call
//       const loginResponse = await fetch('https://prasad-gz5p.onrender.com/api/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
 
//       if (!loginResponse.ok) {
//         const errorData = await loginResponse.json();
//         throw new Error(errorData.message || 'Login failed');
//       }
 
//       const { token } = await loginResponse.json();
//       localStorage.setItem('authToken', token);
 
//       // Check for specific mobile number and password for Admin
//       if (formData.mobile_number === '9848098480' && formData.password === 'shiva') {
//         setError(null);
//         onLoginSuccess('admin'); // Pass role as 'admin'
//         navigate('/Admin-Home');
//       } else {
//         // Now trigger the /home/ API call to check for customer redirection
//         const homeResponse = await fetch('https://prasad-gz5p.onrender.com/api/home/', {
//           headers: {
//             'Authorization': `Token ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
 
//         if (!homeResponse.ok) {
//           throw new Error('Failed to verify home redirection.');
//         }
 
//         const homeData = await homeResponse.json();
 
//         // Check if redirect is "supplier_customer_home"
//         if (homeData.redirect === 'supplier_customer_home') {
//           setError(null);
//           onLoginSuccess('customer'); // Pass role as 'customer'
//           navigate('/customer-home');
//         }else if(homeData.redirect === 'customer_home'){
//           setError(null);
//           onLoginSuccess('BasicCustomer'); // Pass role as 'customer'
//           navigate('/bbrands');
//         } else {
//           throw new Error('Invalid redirection.');
//         }
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className='mainContainer010'>
//       <div className="login-page010">
//         <div className="container010">
//           <h1 className="heading010">Customer Login</h1>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <form onSubmit={handleSubmit} className="form010">
//             <input
//               type="text"
//               name="mobile_number"
//               placeholder="Mobile Number"
//               value={formData.mobile_number}
//               onChange={handleChange}
//               required
//               className="input010"
//             />
//             <div className="password-container010">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="input010"
//               />
//               <span
//                 className="password-toggle010"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//               </span>
//             </div>
//             <button type="submit" className="button010" disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default Login; 