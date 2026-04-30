import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/dashboard/navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={session.user} />
      <main className="container mx-auto px-4 pt-32 pb-16 max-w-7xl">
        {children}
      </main>
    </div>
  )
}
