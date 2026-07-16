$html = Get-Content -Raw -Encoding UTF8 "docs\materials\favorites_2026_7_16.html"
$html = $html -replace 'ICON="data:image/png;base64,[^"]*"', ''

$lines = $html -split "`n"
$stack = @()
$current = $null
$results = @()

foreach ($line in $lines) {
    if ($line -match '<DT><H3[^>]*>([^<]+)</H3>') {
        $current = $Matches[1].Trim()
    }
    elseif ($line -match '<DT><A HREF="([^"]+)"[^>]*>([^<]+)</A>') {
        $url = $Matches[1]
        $title = $Matches[2].Trim()
        $results += [PSCustomObject]@{
            Category = if ($current) { $current } else { 'Uncategorized' }
            Title    = $title
            Url      = $url
        }
    }
}

$grouped = $results | Group-Object Category | ForEach-Object {
    [PSCustomObject]@{
        category = $_.Name
        items    = @($_.Group | ForEach-Object {
            $obj = [ordered]@{ name = $_.Title; url = $_.Url }
            New-Object PSObject -Property $obj
        })
    }
}

$json = ConvertTo-Json -InputObject @($grouped) -Depth 8 -Compress
# Minify slightly
$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("public\materials\favorites.json", $json, $utf8)
Write-Host ("Categories: " + $grouped.Count + ", items: " + $results.Count)
