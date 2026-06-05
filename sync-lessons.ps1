# 차시별정보/*.md -> content/lessons/*.md 동기화
# 사용법: PowerShell에서 .\sync-lessons.ps1 실행

$SRC = Join-Path $PSScriptRoot "..\차시별정보"
$DST = Join-Path $PSScriptRoot "content\lessons"

$lessons = @("1", "2", "3", "4", "5", "6", "7-1", "7-2", "8")

foreach ($i in $lessons) {
    $srcFile = Join-Path $SRC "${i}차시.md"
    $dstFile = Join-Path $DST "${i}.md"
    if (Test-Path $srcFile) {
        Copy-Item $srcFile $dstFile -Force
        Write-Host "복사 완료: ${i}차시.md -> content/lessons/${i}.md"
    } else {
        Write-Warning "소스 없음: $srcFile"
    }
}

Write-Host "`n동기화 완료. 변경 내용을 확인하려면 git diff content/lessons/ 을 실행하세요."
