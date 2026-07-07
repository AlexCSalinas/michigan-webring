import { Student } from '@/types/students'
import { ArrowUpRight } from 'lucide-react'

interface StudentCardProps {
  student: Student
  index: number
}

export function StudentCard({ student, index }: StudentCardProps) {
  const idx = String(index + 1).padStart(2, '0')
  const domain = (student.website || '').replace(/^https?:\/\//, '').replace(/\/$/, '')

  if (!student.website) return null

  return (
    <a
      href={student.website}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border rule p-5 h-full hover:border-rust dark:hover:border-rust hover:bg-paper/60 dark:hover:bg-coal/60 transition-colors duration-150"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-600 tabular-nums select-none">
          {idx}
        </span>
        <span className="text-[10px] font-mono text-rust tabular-nums">
          &apos;{student.graduationYear.slice(-2)}
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-mono text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-rust dark:group-hover:text-rust transition-colors truncate">
          {domain}
        </span>
        <ArrowUpRight
          size={14}
          className="flex-shrink-0 text-neutral-300 dark:text-neutral-700 group-hover:text-rust dark:group-hover:text-rust group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-150"
        />
      </div>
    </a>
  )
}
