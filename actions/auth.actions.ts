'use server'

import { signIn } from "@/types/auth";

export async function signUpAction(formData: { [key: string]: string }) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("Response Status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Error response:", error); // Log the error response from the server
      // Return a structured error with a message and optional code
      return { error: error.message || 'An error occurred during registration.' };
    }

    // If everything goes well, return a success response
    return { success: true };

  } catch (error) {
    console.error("Error in sign-up action:", error);
    // Return a generic error message if something goes wrong on the client side
    return { error: "An unexpected error occurred while trying to register." };
  }
}


export async function logInAction(values: signIn) {
  try {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log("Response Status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("Error response:", error); // Log the error response from the server
      // Return a structured error with a message and optional code
      return { error: error.message || 'An error occurred during log in.' };
    }

    // If everything goes well, return a success response
    return { success: true };

  } catch (error) {
    console.error("Error in log-in action:", error);
    // Return a generic error message if something goes wrong on the client side
    return { error: "An unexpected error occurred while trying to log in." };
  }
}