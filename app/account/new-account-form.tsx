"use client"

import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

export default function AccountPage({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username, website, avatar_url
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-end">
              <span className="text-2xl font-bold text-blue-800">detik</span>
              <span className="text-2xl font-bold text-red-500">com</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <section className="rounded-[0.5rem] border bg-background shadow">
          <div className="flex justify-center my-4 gap-2">

            <Avatar className="h-24 w-24 mb-4 rounded-full bg-gray-500 text-white flex items-center justify-center ">
              <AvatarImage src="https://github.com/shadcn.pngs" alt="avatar" />
              <AvatarFallback className="text-5xl">{username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="w-px h-24 bg-gray-300 mx-3" />

            {/* user form section  */}
            <div className="w-[70%]">
              <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="username"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)} />
              </div>


              <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={user?.email || ''}

                  disabled />
              </div>

              <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="fullname">fullname</Label>
                <Input
                  type="text"
                  id="fullname"
                  placeholder="fullname"
                  value={fullname || ''}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>


              <span className="text-lg font-semibold">Hello chat</span>
              <p className="text-sm text-muted-foreground">dominance.</p>

              <div className="flex gap-4">
                <form action="/auth/signout" method="post">

                  <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    // onClick={() => {
                    //   redirect("/auth/signout")
                    // }}
                    disabled={loading}
                  >

                    {loading ? 'Loading...' : 'Logout'}
                    {/* Keluar */}
                  </Button>
                </form>
                <Button
                  onClick={() => updateProfile({ fullname, username, website, avatar_url })}
                  disabled={loading}
                  className="bg-blue-700 hover:bg-blue-800 text-white">
                  {loading ? 'Loading ...' : 'Update'}
                </Button>
              </div>

            </div>

          </div>
        </section>
      </main>
    </div>
  )
}