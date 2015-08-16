function ZipFiles( $zipfilename, [string[]]$files )
{
  Add-Type -Assembly System.IO.Compression
  Add-Type -Assembly System.IO.Compression.FileSystem

  $archMode = [System.IO.Compression.ZipArchiveMode]::Create
  $compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal

  if (Test-Path $zipfilename) { Remove-Item $zipfilename }

  $zipArch = [System.IO.Compression.ZipFile]::Open($zipfilename, $archMode)
  foreach ($file in $files) {
    $item = Split-Path $file -Leaf
    Write-Host $item
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zipArch, $file, $item, $compressionLevel);
  }
  $zipArch.Dispose()
}

ZipFiles "GMailFont.zip" `
         @("options.html", "fonts.js", "options.js", "manifest.json")

$pem = "..\..\Documents\Keys\ChromeExtensions.pem"

Get-Content $pem | openssl rsa -pubout -outform DER | Out-File -FilePath GMailFont.pub
Get-Content GMailFont.zip | openssl.exe sha1 -sha1 -binary -sign $pem | Out-File -FilePath GMailFont.sig

[byte[]] $pub = Get-Content -encoding byte -path GMailFont.pub
[byte[]] $sig = Get-Content -encoding byte -path GMailFont.sig
[byte[]] $zip = Get-Content -encoding byte -path GMailFont.zip

[byte[]] $pubLenBytes = [BitConverter]::GetBytes($pub.Length)
[byte[]] $sigLenBytes = [BitConverter]::GetBytes($sig.Length)

[Byte[]] $magic = 0x43, 0x72, 0x32, 0x34
[Byte[]] $version = 0x02, 0x00, 0x00, 0x00

Set-Content -value $magic -encoding byte -path "GMailFont.crx"
Add-Content -value $version -encoding byte -path "GMailFont.crx"
Add-Content -value $pubLenBytes -encoding byte -path "GMailFont.crx"
Add-Content -value $sigLenBytes -encoding byte -path "GMailFont.crx"
Add-Content -value $pub -encoding byte -path "GMailFont.crx"
Add-Content -value $sig -encoding byte -path "GMailFont.crx"
Add-Content -value $zip -encoding byte -path "GMailFont.crx"

Remove-Item GMailFont.zip, GMailFont.sig, GMailFont.pub
