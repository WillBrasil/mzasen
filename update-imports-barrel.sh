#!/bin/bash

# Atualiza importações para usar o arquivo de barril principal
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/forms/button"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/forms/input"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/forms/label"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/forms/textarea"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/forms/radio-group"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/forms/select"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/forms/switch"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/data-display/card"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/data-display/table"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/feedback/alert"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/feedback/use-toast"|from "@/components/ui"|g' {} \;
find app components -type f -name "*.tsx" -exec sed -i 's|from "@/components/ui/navigation/sheet"|from "@/components/ui"|g' {} \;

echo "Importações atualizadas para usar o arquivo de barril principal!" 