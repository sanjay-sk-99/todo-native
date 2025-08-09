import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
//import redux connectivity and state
import { useDispatch } from "react-redux";
import { logIn } from "../slices/features/authSlice";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = ({ navigation }) => {
  // For trigger reducer function
  const dispatch = useDispatch();

  // Fixed credentials for validation
  const validEmail = "sanjay@gmail.com";
  const validPass = "sanjay@123";

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Handle form submission
  const handleSubmit = (values, { setFieldError, resetForm }) => {
    const { email, password } = values;

    if (validEmail !== email) {
      setFieldError("email", "Enter valid Email");
    } else if (validPass !== password) {
      setFieldError("password", "Enter valid Password");
    } else {
      Alert.alert("Login Successfully");
      resetForm();
      // Storing login token using redux
      dispatch(logIn("1234"));
    }
  };

    // Loader screen
        if (loading) {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <ActivityIndicator size="large" color="#DA70D6" />
            </View>
          );
        }

  return (
    // For overlapping the keyboard when we press input
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* It will enable scrolling */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        {/* This section contains full data for login form */}
        <View style={styles.imgcontainer}>
          <Image
            source={require("../../assets/login-img.jpg")}
            style={styles.img}
          />
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
      
          }) => (
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Login</Text>

              <TextInput
                placeholder="Email Address"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={[
                  styles.txtinput,
                  touched.email && errors.email && styles.inputError,
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={[
                  styles.txtinput,
                  touched.password && errors.password && styles.inputError,
                ]}
                secureTextEntry
              />

               {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={{ alignItems: "flex-end", marginTop: 8 }}
                onPress={() => navigation.navigate("ForgetPass")}
              >
                <Text style={{ color: "cornflowerblue" }}>Forget Password ?</Text>
              </TouchableOpacity>

             

              <TouchableOpacity
                style={[
                  styles.loginbtn,
            
                ]}
                onPress={handleSubmit}
               
              >
                <Text style={styles.btntext}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Stylesheet for login component
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    paddingVertical: 90,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DA70D6",
    marginBottom: 10,
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  imgcontainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  txtinput: {
    borderColor: "cornflowerblue",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: 300,
    fontSize: 20,
    marginBottom: 5,
  },
  inputError: {
    borderColor: "red",
  },
  loginbtn: {
    borderWidth: 2,
    borderColor: "cornflowerblue",
    backgroundColor: "cornflowerblue",
    borderRadius: 5,
    padding: 8,
    width: 300,
    marginTop: 10,
  },
  disabledBtn: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  btntext: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  error: {
    margin: 5,
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  textContainer: {
    alignItems: "center",
  },
});

export default Login;