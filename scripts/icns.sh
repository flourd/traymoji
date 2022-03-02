function make_icns() {
    local input output iconset outputpng
    input=${1:-"../static/icon/AppIcon.png"}
    output=${2:-"../build/icon.icns"}
    iconset="$(dirname $output)/$(basename $output | cut -d. -f1).iconset"
    outputpng="$(dirname $output)/icon.png"
    mkdir -p "$iconset" >&/dev/null
    cp -f "$input" 

    for __size in 16 32 128 256 512; do 
        sips -z $__size $__size     "$input" --out "${iconset}/icon_${__size}x${__size}.png" > /dev/null
        sips -z $(($__size * 2)) $(($__size * 2))     "$input" --out "${iconset}/icon_${__size}x${__size}@2x.png" > /dev/null
    done

    iconutil -c icns $iconset && 
        rm -rf $iconset
}
if [ $# -eq 0 ] || [[ "$1" == "-h" || "$1" == "--help" || "$1" == "-?" ]]; then

cat<<'USAGEEOL'

    icns.sh - automated macOS .icns conversion program

    USAGE

        $ ./scripts/icns.sh <source.png> <destination.icns>

    SUMMARY

        Resizes source.png to the required sizes, formatted into one file.
        The final file output will be located at destination.icns.

        This will generate a single destination.icns file, in Apple's .icns
        file format for App Icons, with each of the following resolutions:
          - 16x16       - 16x16@2x    (for Retina Displays)
          - 32x32       - 32x32@2x
          - 128x128     - 128x128@2x
          - 256x256     - 256x256@2x
          - 512x512     - 512x512@2x

    NOTES

        o I recommend using  a source .png 1024x1024 in resolution or greater.
        o Provide absolute paths for <source.png> and <destination.iconset> to
          reduce the chance of a filesystem mishap during conversion!

USAGEEOL

    [ $# = 0 ] && exit 1;
    exit 0;

else
    make_icns "${@}" && 
        unset -f make_icons && 
            exit 0;
    exit 2;
fi