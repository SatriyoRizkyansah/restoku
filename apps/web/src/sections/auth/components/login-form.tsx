import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios"; // axios instance

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setTokenToStorage = (token: string) => {
    try {
      if (typeof Storage !== "undefined" && window.localStorage) {
        localStorage.setItem("token", token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error saat menyimpan ke localStorage:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Mengirim request login...");
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      console.log("Response dari API:", response.data);

      const token = response.data.data.token;

      if (!token) {
        throw new Error("Token tidak ditemukan dalam response");
      }

      console.log("Token yang diterima:", token);

      const isTokenSaved = setTokenToStorage(token);

      if (isTokenSaved) {
        const savedToken = localStorage.getItem("token");

        if (savedToken === token) {
          navigate("/dashboard");
        } else {
          throw new Error("Token gagal disimpan dengan benar");
        }
      } else {
        throw new Error("Gagal menyimpan token ke localStorage");
      }
    } catch (error: any) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter your username below to login to your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="johndoe123" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
