'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { app } from "@/lib/firabase";
import { cn } from "@/lib/utils";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const authGoogle = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

async function loginWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(authGoogle, email, password);
    return userCredential.user;
  } catch (error) {
    console.log('=>error --->', error);
    // throw new Error(error.message);
  }
}

// async function loginWithGoogle() {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     return result.user;
//   } catch (error) {
//     console.log('=>error --->', error);
//     // throw new Error(error.message);
//   }
// }

function featureDevelop() {
  toast({
    className: cn(
      'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
    ),
    variant: 'default',
    title: "Função em desenvolvimento em breve você vai fazer o login com o google!",
    description: "Por favor aguarde até que a função seja desenvolvida.",
  })
}

export default function LoginPage() {
  const [error, setError] = useState("");
  const route = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Email obrigatório"),
      password: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha obrigatória"),
    }),
    onSubmit: async (values,) => {
      await loginWithEmail(values.email, values.password).then((user) => {
        if (user) {
          route.push('/admin')
        } else {
          toast({
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            title: "Usuário não encontrado",
            description: "Verifique suas credenciais e tente novamente.",
            variant: "destructive",
          });
          formik.setFieldValue("password", "");
          setError("Credenciais inválidas.");
        }
      });
    },
  });

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
                className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Senha"
                {...formik.getFieldProps("password")}
                className={formik.touched.password && formik.errors.password ? "border-red-500" : ""}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">ou</p>
            <Button onClick={featureDevelop} className="mt-2 w-full bg-blue-500 hover:bg-blue-600">
              Entrar com Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

  );
}
