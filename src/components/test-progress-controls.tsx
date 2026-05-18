import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTestProgressMeta,
  ProgressStatus,
  TEST_PROGRESS_OPTIONS,
  TestStatus,
} from "@/hooks/use-test-status";
import { cn } from "@/lib/utils";

type ProgressBadgeProps = {
  status: ProgressStatus;
  detail?: TestStatus;
};

export function TestProgressBadge({ status, detail }: ProgressBadgeProps) {
  const meta = getTestProgressMeta(status);
  const scoreText =
    status === "finished" && detail?.score != null && detail?.total != null
      ? ` ${detail.score}/${detail.total}`
      : "";

  return (
    <Badge variant="outline" className={cn("text-xs", meta.className)}>
      {meta.label}
      {scoreText}
    </Badge>
  );
}

type ProgressSelectProps = {
  value: ProgressStatus;
  onChange: (value: ProgressStatus) => void;
};

export function TestProgressSelect({ value, onChange }: ProgressSelectProps) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as ProgressStatus)}>
      <SelectTrigger className="h-9">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {TEST_PROGRESS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
