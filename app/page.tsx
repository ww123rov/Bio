"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Code, ExternalLink, User, LinkIcon, BarChart3, Layers, GamepadIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DiscordData {
  discord_status: string
  activities: Array<{
    type: number
    name: string
  }>
}

export default function Home() {
  const [discordStatus, setDiscordStatus] = useState<string>("offline")
  const [discordActivity, setDiscordActivity] = useState<string | null>(null)
  const [progressValues, setProgressValues] = useState([0, 0, 0])

  useEffect(() => {
    const userId = "830702760952463400"

    // Animate progress bars
    const timer = setTimeout(() => {
      setProgressValues([80, 15, 5])
    }, 500)

    // Fetch Discord status
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        const data = await response.json()

        if (data.success) {
          const userData = data.data as DiscordData
          setDiscordStatus(userData.discord_status)

          const gameActivity = userData.activities?.find((activity) => activity.type === 0)
          if (gameActivity) {
            setDiscordActivity(gameActivity.name)
          } else {
            setDiscordActivity(null)
          }
        }
      } catch (error) {
        console.error("Error fetching Discord status:", error)
      }
    }

    fetchDiscordStatus()
    const interval = setInterval(fetchDiscordStatus, 60000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Онлайн"
      case "idle":
        return "Неактивен"
      case "dnd":
        return "Не беспокоить"
      default:
        return "Оффлайн"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-amber-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-indigo-500/5 blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-12 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 animate-fade-in">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center justify-center w-32 h-32 bg-gray-900 rounded-full overflow-hidden border-2 border-gray-800">
              <Image
                src="/logo.png"
                alt="ww123rov logo"
                width={100}
                height={100}
                className="object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
              ww123rov
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/70 border border-gray-700/50">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(discordStatus)}`}></span>
                <span className="text-sm font-medium">{getStatusText(discordStatus)}</span>
              </div>

              {discordActivity && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/70 border border-gray-700/50">
                  <GamepadIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Играет в {discordActivity}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Info Card */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-xl">Основное</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Возраст: 16
                </li>
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Родился в: Украине
                </li>
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Нахожус в: Польше
                </li>
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Время: (GMT+2)
                </li>
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Языки: Русский, Украинский, Польский, Дартянский
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contacts Card */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-xl">Контакты</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Discord:
                  <a
                    href="https://discord.com/users/830702760952463400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
                  >
                    ww123rov
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Telegram:
                  <a
                    href="https://t.me/ww123rov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
                  >
                    ww123rov
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> VK:
                  <a
                    href="https://vk.com/dartinusUA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
                  >
                    dartinusUA
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-xl">Навыки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/20"
                >
                  Java
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/20"
                >
                  HTML
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/20"
                >
                  CSS
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/20"
                >
                  Python
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/20"
                >
                  JS
                </Badge>
              </div>
              <p className="text-gray-400 text-sm">
                В основном работаю с плагинами для Minecraft и личным чит-клиентом.
              </p>
            </CardContent>
          </Card>

          {/* Projects Card */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-xl">Проекты</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> DART404:
                  <a
                    href="https://discord.gg/m8RRBSen5j"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
                  >
                    Discord
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <span className="text-purple-400">•</span> Nexgen Client:
                  <a
                    href="https://discord.gg/Kbhg9ztK6d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
                  >
                    Discord
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>

              <div className="space-y-4 border-l-2 border-purple-500/30 pl-4">
                <div>
                  <div className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-purple-500/10 text-purple-300 mb-2">
                    Последние новости
                  </div>
                  <h3 className="text-base font-semibold mb-1">Nexgen Client</h3>
                  <p className="text-sm text-gray-400">
                    Разработка и поддержка Minecraft чит-клиента временно остоновлена.
                  </p>
                </div>
                <div>
                  <div className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-purple-500/10 text-purple-300 mb-2">
                    Последние новости
                  </div>
                  <h3 className="text-base font-semibold mb-1">DART404</h3>
                  <p className="text-sm text-gray-400">Сервер находиться в переработке.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Card */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-xl">О себе</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">
                Обычный типок, который страдает фигнёй в интернете. Страшный майнсруфтер/хойщик. Есть претензии ко мне?
                – пошёл нахуй.
              </p>

              <blockquote className="relative p-4 pl-6 border-l-4 border-purple-500 bg-purple-500/5 rounded-r-lg">
                <p className="text-gray-300 italic">
                  "Если тебя ебут в жопу — лучшее, что можно сделать, это получить от этого удовольствие."
                </p>
                <footer className="mt-2 text-right text-sm font-medium text-gray-200">— Великий ww123rov</footer>
              </blockquote>
            </CardContent>
          </Card>

          {/* Language Usage Card */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-xl">Частота использования языка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Java</span>
                  <span className="text-sm text-gray-400">80%</span>
                </div>
                <Progress value={progressValues[0]} className="h-2 bg-gray-800">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                </Progress>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Python</span>
                  <span className="text-sm text-gray-400">15%</span>
                </div>
                <Progress value={progressValues[1]} className="h-2 bg-gray-800">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                </Progress>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">JavaScript</span>
                  <span className="text-sm text-gray-400">5%</span>
                </div>
                <Progress value={progressValues[2]} className="h-2 bg-gray-800">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                </Progress>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
